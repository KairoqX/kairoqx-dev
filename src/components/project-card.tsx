import Image from "next/image";
import { ExternalLink, Star, Calendar } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/utils/format-relative-time";

export interface ProjectCardData {
  name: string;
  /** Optional display name (from src/data/projects.ts). */
  title?: string;
  /** Optional filter-tab override (from src/data/projects.ts). */
  category?: "ai" | "web";
  /** Optional banner image/GIF (path inside /public, or an https URL). */
  image?: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  size: number;
}

/**
 * Project card. With an `image` it shows your banner; without one it draws a
 * banner in the same visual language (big bold name, spaced uppercase
 * subtitle, dark corner block) so every card looks consistent.
 *
 * Plain anchor + CSS-only hover — no animation library.
 */
export function ProjectCard({ project }: { project: ProjectCardData; index?: number }) {
  const href = project.homepage || project.html_url;
  const displayName = project.title ?? project.name;
  // Animated GIFs must skip Next's image optimizer or they'd lose animation.
  const isGif = project.image?.toLowerCase().split("?")[0].endsWith(".gif");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass group flex h-full flex-col overflow-hidden rounded-xl transition-[translate,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-ink"
    >
      {/* Banner */}
      <div className="relative aspect-[5/2] overflow-hidden border-b border-line bg-bg">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${displayName} banner`}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            unoptimized={isGif}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full flex-col justify-center px-6">
            <div
              aria-hidden="true"
              className="shape-tri-br absolute bottom-0 right-0 h-14 w-14"
            />
            <p className="font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              {displayName}
            </p>
            {project.language && (
              <p className="mt-2 font-display text-[0.7rem] font-light uppercase tracking-[0.28em] text-muted">
                {project.language}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-display text-lg font-bold">{displayName}</h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
          {project.description || "No description provided yet."}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.language && <Badge>{project.language}</Badge>}
          {project.topics.slice(0, 2).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-line pt-4 font-mono text-xs text-muted">
          <span className="inline-flex items-center gap-1.5 transition-colors group-hover:text-ink">
            <GithubIcon size={14} /> Code
          </span>
          {project.homepage && (
            <span className="inline-flex items-center gap-1.5 text-ink">
              <ExternalLink size={14} /> Live Demo
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Star size={12} /> {project.stargazers_count}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} />
              {/* Depends on "now", so server and client can differ. */}
              <span suppressHydrationWarning>
                {formatRelativeTime(project.pushed_at)}
              </span>
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
