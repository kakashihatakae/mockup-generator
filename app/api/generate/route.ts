import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";
import { buildPrompt } from "@/lib/prompt-builder";
import type { ProjectFormData } from "@/types/database";

export async function POST(request: Request) {
  try {
    // 1. Authenticate
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Check credits
    const { data: profile } = await supabase
      .from("users")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (!profile || profile.credits < 1) {
      return Response.json({ error: "No credits remaining" }, { status: 402 });
    }

    // 3. Parse form data
    const body = await request.json();
    const {
      projectId,
      formData,
      graphicBase64,
    }: {
      projectId: string;
      formData: ProjectFormData;
      graphicBase64?: string;
    } = body;

    // 4. Build prompt
    const prompt = buildPrompt(formData);

    // 5. Update project status to generating
    await supabase
      .from("projects")
      .update({
        status: "generating",
        generation_prompt: prompt,
        model_sex: formData.model_sex,
        model_race: formData.model_race,
        hair_color: formData.hair_color,
        build_type: formData.build_type,
        pants_description: formData.pants_description,
        clothing_type: formData.clothing_type,
        clothing_color: formData.clothing_color,
        picture_type: formData.picture_type,
      })
      .eq("id", projectId)
      .eq("user_id", user.id);

    // 6. Call Gemini API
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    // Build contents array
    const contents: Array<
      | string
      | { inlineData: { mimeType: string; data: string } }
    > = [];

    // If graphic uploaded, include it as inline image
    if (graphicBase64) {
      // Extract the base64 data portion (remove data:image/xxx;base64, prefix)
      const base64Data = graphicBase64.includes(",")
        ? graphicBase64.split(",")[1]
        : graphicBase64;

      contents.push({
        inlineData: {
          mimeType: "image/png",
          data: base64Data,
        },
      });
    }

    contents.push(prompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents,
      config: {
        responseModalities: ["IMAGE", "TEXT"],
      },
    });

    // 7. Extract generated image
    let generatedImageBase64: string | null = null;

    if (response.candidates && response.candidates.length > 0) {
      const parts = response.candidates[0].content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            generatedImageBase64 = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }
    }

    if (!generatedImageBase64) {
      await supabase
        .from("projects")
        .update({ status: "failed" })
        .eq("id", projectId)
        .eq("user_id", user.id);

      return Response.json(
        { error: "Failed to generate image" },
        { status: 500 }
      );
    }

    // 8. Deduct credit
    await supabase
      .from("users")
      .update({ credits: profile.credits - 1 })
      .eq("id", user.id);

    // 9. Get existing images and append new one
    const { data: project } = await supabase
      .from("projects")
      .select("generated_images")
      .eq("id", projectId)
      .single();

    const existingImages = (project?.generated_images as string[]) || [];
    const updatedImages = [...existingImages, generatedImageBase64];

    // 10. Save to project
    await supabase
      .from("projects")
      .update({
        status: "completed",
        generated_images: updatedImages,
      })
      .eq("id", projectId)
      .eq("user_id", user.id);

    return Response.json({
      image: generatedImageBase64,
      creditsRemaining: profile.credits - 1,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
