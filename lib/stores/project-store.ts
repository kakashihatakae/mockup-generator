import { create } from "zustand";
import type { ProjectFormData } from "@/types/database";
import { DEFAULT_FORM_DATA } from "@/types/database";

interface ProjectStore {
  form: ProjectFormData;
  setForm: (form: ProjectFormData | ((prev: ProjectFormData) => ProjectFormData)) => void;
  resetForm: () => void;
  
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  
  images: string[];
  setImages: (images: string[] | ((prev: string[]) => string[])) => void;
  
  credits: number;
  setCredits: (credits: number) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  form: DEFAULT_FORM_DATA,
  setForm: (form) => 
    set((state) => ({ 
      form: typeof form === 'function' ? form(state.form) : form 
    })),
  resetForm: () => set({ form: DEFAULT_FORM_DATA }),
  
  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  images: [],
  setImages: (images) => 
    set((state) => ({ 
      images: typeof images === 'function' ? images(state.images) : images 
    })),
  
  credits: 20,
  setCredits: (credits) => set({ credits }),
}));
