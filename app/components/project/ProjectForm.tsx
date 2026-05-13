"use client";

import { SegmentedControl } from "./SegmentedControl";
import { FileUploader } from "./FileUploader";
import { Loader2, Sparkles } from "lucide-react";
import type {
  ProjectFormData,
  ModelSex,
  ModelRace,
  HairColor,
  BuildType,
  ClothingType,
  PictureType,
} from "@/types/database";

interface ProjectFormProps {
  form: ProjectFormData;
  setForm: (fn: (prev: ProjectFormData) => ProjectFormData) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  credits: number;
}

export function ProjectForm({
  form,
  setForm,
  onGenerate,
  isGenerating,
  credits,
}: ProjectFormProps) {
  function update<K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFileSelect(file: File | null) {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          uploaded_graphic: file,
          uploaded_graphic_preview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({
        ...prev,
        uploaded_graphic: null,
        uploaded_graphic_preview: null,
      }));
    }
  }

  return (
    <div className="space-y-6">
      {/* Model Sex */}
      <SegmentedControl<ModelSex>
        label="Model Sex"
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
        value={form.model_sex}
        onChange={(v) => update("model_sex", v)}
      />

      {/* Model Race */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">Model Race</label>
        <select
          value={form.model_race}
          onChange={(e) => update("model_race", e.target.value as ModelRace)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
        >
          <option value="asian">Asian</option>
          <option value="white">White</option>
          <option value="african_american">African American</option>
          <option value="latin">Latin</option>
        </select>
      </div>

      {/* Hair Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">Hair Color</label>
        <select
          value={form.hair_color}
          onChange={(e) => update("hair_color", e.target.value as HairColor)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
        >
          <option value="black">Black</option>
          <option value="white">White / Blonde</option>
          <option value="red">Red</option>
          <option value="brown">Brown</option>
        </select>
      </div>

      {/* Build Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">Build Type</label>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              "skinny",
              "lean",
              "athletic",
              "toned",
              "jacked",
              "bulky",
            ] as BuildType[]
          ).map((build) => (
            <button
              key={build}
              type="button"
              onClick={() => update("build_type", build)}
              className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all capitalize ${
                form.build_type === build
                  ? "bg-primary border-primary/50 text-white shadow-[0_0_15px_rgba(124,92,255,0.3)]"
                  : "bg-white/5 border-white/10 text-muted hover:bg-white/10 hover:text-white"
              }`}
            >
              {build}
            </button>
          ))}
        </div>
      </div>

      {/* Clothing Type */}
      <SegmentedControl<ClothingType>
        label="Clothing Type"
        options={[
          { value: "shirt", label: "T-Shirt" },
          { value: "hoodie", label: "Hoodie" },
        ]}
        value={form.clothing_type}
        onChange={(v) => update("clothing_type", v)}
      />

      {/* Clothing Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">
          Clothing Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={form.clothing_color}
            onChange={(e) => update("clothing_color", e.target.value)}
            className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
          />
          <input
            type="text"
            value={form.clothing_color}
            onChange={(e) => update("clothing_color", e.target.value)}
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Picture Type */}
      <SegmentedControl<PictureType>
        label="Picture Type"
        options={[
          { value: "front", label: "Front" },
          { value: "back", label: "Back" },
          { value: "both", label: "Both" },
        ]}
        value={form.picture_type}
        onChange={(v) => update("picture_type", v)}
      />

      {/* Pants Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted">
          Pants Description
        </label>
        <input
          type="text"
          value={form.pants_description}
          onChange={(e) => update("pants_description", e.target.value)}
          placeholder="e.g. dark blue slim jeans"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      {/* Upload Graphic */}
      <FileUploader
        onFileSelect={handleFileSelect}
        preview={form.uploaded_graphic_preview}
      />

      {/* Generate Button */}
      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating || credits <= 0}
        className="w-full py-4 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:shadow-[0_0_25px_rgba(124,92,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : credits <= 0 ? (
          "No credits remaining"
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate Mockup
            <span className="ml-1 text-xs opacity-70">(1 credit)</span>
          </>
        )}
      </button>
    </div>
  );
}
