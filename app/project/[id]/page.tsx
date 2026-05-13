"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ProjectForm } from "@/app/components/project/ProjectForm";
import { ImagePreview } from "@/app/components/project/ImagePreview";
import { getProject } from "@/lib/actions/project";
import { toast } from "sonner";
import type { ProjectFormData, Project } from "@/types/database";
import { DEFAULT_FORM_DATA } from "@/types/database";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [form, setForm] = useState<ProjectFormData>(DEFAULT_FORM_DATA);
  const [images, setImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [credits, setCredits] = useState(20);
  const [loading, setLoading] = useState(true);

  // Load existing project data
  useEffect(() => {
    async function load() {
      const project = await getProject(projectId);
      if (!project) {
        toast.error("Project not found");
        router.push("/dashboard");
        return;
      }

      // Populate form with existing data
      setForm((prev) => ({
        ...prev,
        model_sex: project.model_sex,
        model_race: project.model_race,
        hair_color: project.hair_color,
        build_type: project.build_type,
        pants_description: project.pants_description,
        clothing_type: project.clothing_type,
        clothing_color: project.clothing_color,
        picture_type: project.picture_type,
      }));

      setImages(project.generated_images || []);
      setLoading(false);
    }
    load();
  }, [projectId, router]);

  // Fetch credits
  useEffect(() => {
    async function loadCredits() {
      try {
        const res = await fetch("/api/credits");
        if (res.ok) {
          const data = await res.json();
          setCredits(data.credits);
        }
      } catch {
        // fallback
      }
    }
    loadCredits();
  }, []);

  async function handleGenerate() {
    if (credits <= 0) {
      toast.error("No credits remaining. Please purchase more.");
      return;
    }

    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          formData: form,
          graphicBase64: form.uploaded_graphic_preview || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Generation failed");
        setIsGenerating(false);
        return;
      }

      setImages((prev) => [...prev, data.image]);
      setCredits(data.creditsRemaining);
      toast.success("Mockup generated successfully!");
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-white/5 px-6 py-3 flex items-center justify-between"
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">
            <span className="text-accent font-medium">{credits}</span> credits
          </span>
        </div>
      </motion.div>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full lg:w-[440px] lg:min-w-[440px] p-6 lg:p-8 lg:border-r border-white/5 lg:h-[calc(100vh-57px)] lg:overflow-y-auto"
        >
          <h2 className="text-xl font-bold mb-6">Configure Mockup</h2>
          <ProjectForm
            form={form}
            setForm={setForm}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            credits={credits}
          />
        </motion.div>

        {/* Right: Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 p-6 lg:p-8 lg:h-[calc(100vh-57px)] lg:overflow-y-auto"
        >
          <h2 className="text-xl font-bold mb-6">Generated Mockups</h2>
          <ImagePreview images={images} isGenerating={isGenerating} />
        </motion.div>
      </div>
    </div>
  );
}
