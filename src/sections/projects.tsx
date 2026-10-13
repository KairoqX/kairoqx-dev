import { getGithubProfileData, selectProjects } from "@/lib/github";
import { Reveal } from "@/components/ui/reveal";
import { ProjectsGrid } from "@/components/projects-grid";

/**
 * Server Component: fetches live repo data from the GitHub REST API at
 * request/build time (see src/lib/github.ts), then shows the repos you
 * chose in src/data/projects.ts. Details (description, stars, language,
 * last push...) always come live from GitHub and refresh hourly.
 */
export async function Projects() {
  const { repos, isLive } = await getGithubProfileData();
  // Which projects show up is controlled by src/data/projects.ts.
  const featured = selectProjects(repos);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.26em] text-muted">
            {"// featured projects"}
          </span>
          <h2 className="mb-4 mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Things I&apos;ve built while learning
          </h2>
          <p className="leading-relaxed text-muted">
            Pulled live from my GitHub — a mix of AI/ML experiments and web
            projects. Some are polished, some are still rough — all of them
            taught me something.
          </p>
          {!isLive && (
            <p className="mt-3 font-mono text-xs text-muted">
              Showing cached project data — live GitHub fetch is temporarily
              unavailable.
            </p>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <ProjectsGrid projects={featured} />
        </Reveal>
      </div>
    </section>
  );
}
