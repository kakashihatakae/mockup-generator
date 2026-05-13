"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { ProjectCard } from "@/app/components/dashboard/ProjectCard";
import { EmptyState } from "@/app/components/dashboard/EmptyState";
import { createProject, getProjects } from "@/lib/actions/project";
import type { Project } from "@/types/database";

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function load() {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    }
    load();
  }, []);

  function handleCreateProject() {
    startTransition(async () => {
      const result = await createProject();
      if ("id" in result) {
        router.push(`/project/${result.id}`);
      }
    });
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-10"
      >
        <div>
          <h1 className="text-[32px] font-semibold tracking-[-0.015em] text-foreground">Projects</h1>
          <p className="text-[15px] text-muted tracking-tight mt-1">
            {projects.length > 0
              ? `${projects.length} mockup${projects.length === 1 ? "" : "s"} generated`
              : "No projects created yet."}
          </p>
        </div>

        <button
          onClick={handleCreateProject}
          disabled={isPending}
          className="apple-btn-primary flex items-center gap-2 text-[15px] disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="apple-card overflow-hidden animate-pulse"
            >
              <div className="aspect-[4/3] bg-black/[0.03]" />
              <div className="p-4 space-y-3 bg-white">
                <div className="h-4 bg-black/[0.04] rounded w-2/3" />
                <div className="h-3 bg-black/[0.04] rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState onCreateProject={handleCreateProject} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
