"use client";

import { motion } from "framer-motion";
import { Download, Image as ImageIcon, Trash2 } from "lucide-react";
import type { Project } from "@/types/database";
import { deleteProject } from "@/lib/actions/project";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const hasImages = project.generated_images && project.generated_images.length > 0;
  const thumbnail = hasImages ? project.generated_images[0] : null;

  const createdAt = new Date(project.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm("Delete this project?")) return;
    setIsDeleting(true);
    await deleteProject(project.id);
    router.refresh();
  }

  function handleDownload(e: React.MouseEvent) {
    e.stopPropagation();
    if (!thumbnail) return;

    const link = document.createElement("a");
    link.href = thumbnail;
    link.download = `mockforge-${project.id.slice(0, 8)}.png`;
    link.click();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => router.push(`/project/${project.id}`)}
      className="apple-card overflow-hidden cursor-pointer group hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 bg-white"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] bg-[#f5f5f7] border-b border-black/[0.04] overflow-hidden">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt="Generated mockup"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-muted/30" />
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-[11px] font-medium tracking-wide px-2 py-1 rounded-md ${
              project.status === "completed"
                ? "bg-white/80 text-foreground backdrop-blur-md shadow-sm"
                : project.status === "generating"
                ? "bg-white/80 text-muted backdrop-blur-md shadow-sm animate-pulse"
                : project.status === "failed"
                ? "bg-red-500/10 text-red-600 backdrop-blur-md"
                : "bg-white/80 text-muted backdrop-blur-md shadow-sm"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {hasImages && (
            <button
              onClick={handleDownload}
              className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-center hover:bg-white transition-colors"
              title="Download"
            >
              <Download className="w-3.5 h-3.5 text-foreground" />
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md shadow-sm flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 text-foreground hover:text-red-600" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-[15px] font-medium tracking-tight">
            {project.clothing_type || "Untitled Project"}
          </h4>
          <div
            className="w-3 h-3 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
            style={{ backgroundColor: project.clothing_color || "#000" }}
            title={project.clothing_color || "Black"}
          />
        </div>
        <p className="text-[13px] text-muted">{createdAt}</p>
      </div>
    </motion.div>
  );
}
