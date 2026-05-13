/* ─── Supabase Database Types ─── */

export type ModelSex = "male" | "female";
export type ModelRace = "asian" | "white" | "african_american" | "latin";
export type HairColor = "black" | "white" | "red" | "brown";
export type BuildType =
  | "skinny"
  | "lean"
  | "athletic"
  | "toned"
  | "jacked"
  | "bulky";
export type ClothingType = "shirt" | "hoodie";
export type PictureType = "front" | "back" | "both";
export type ProjectStatus = "draft" | "generating" | "completed" | "failed";

export interface UserProfile {
  id: string;
  email: string;
  credits: number;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  model_sex: ModelSex;
  model_race: ModelRace;
  hair_color: HairColor;
  build_type: BuildType;
  pants_description: string;
  clothing_type: ClothingType;
  clothing_color: string;
  picture_type: PictureType;
  uploaded_graphic_url: string | null;
  generated_images: string[];
  generation_prompt: string;
  status: ProjectStatus;
}

/* ─── Form state (before saving) ─── */
export interface ProjectFormData {
  model_sex: ModelSex;
  model_race: ModelRace;
  hair_color: HairColor;
  build_type: BuildType;
  pants_description: string;
  clothing_type: ClothingType;
  clothing_color: string;
  picture_type: PictureType;
  uploaded_graphic: File | null;
  uploaded_graphic_preview: string | null;
}

export const DEFAULT_FORM_DATA: ProjectFormData = {
  model_sex: "male",
  model_race: "asian",
  hair_color: "black",
  build_type: "athletic",
  pants_description: "",
  clothing_type: "shirt",
  clothing_color: "#000000",
  picture_type: "front",
  uploaded_graphic: null,
  uploaded_graphic_preview: null,
};
