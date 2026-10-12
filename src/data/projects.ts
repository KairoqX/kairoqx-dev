/**
 * projects.ts  —  YOUR "ADD PROJECT" FILE
 * -----------------------------------------------------------------------
 * Choose which GitHub repos appear in the Projects section.
 *
 * HOW TO ADD A PROJECT
 *   1. Add the repo's exact name from github.com/KairoqX to the list below.
 *   2. Commit + push. That's it — the description, language, stars, topics,
 *      last-updated time and live-demo link are pulled from GitHub
 *      automatically (refreshes hourly).
 *
 * HOW TO REMOVE ONE: delete its line.
 * ORDER: projects show up in the same order as this list.
 *
 * Want to customise how a project looks? Use the object form instead of a
 * plain string; every field except `repo` is optional:
 *
 *   {
 *     repo: "Vexiqora",            // exact GitHub repo name (required)
 *     title: "Vexiqora Tools",     // display name instead of the repo name
 *     description: "My own text",  // overrides the GitHub description
 *     homepage: "https://...",     // overrides the repo's website/demo link
 *     category: "web",             // "ai" | "web" -> which filter tab it's in
 *     image: "/projects/vexiqora.png", // banner image or GIF (see below)
 *   }
 *
 * BANNER IMAGES / GIFs
 *   1. Put the file in  public/projects/  (e.g. public/projects/vexiqora.png)
 *   2. Set  image: "/projects/vexiqora.png"  on that project.
 *   Without an image, the card shows the project's initials as before.
 *   Tips: ~800x320 px (5:2 ratio) looks best; keep PNG/JPG/WebP under
 *   ~200 KB and GIFs under ~1.5 MB (big GIFs are the #1 cause of lag).
 *
 * Notes
 *   - Names are matched case-insensitively.
 *   - Forks and archived repos are not available to pick (they're filtered
 *     out in src/lib/github.ts).
 *   - If this list is empty, the site falls back to showing your top 6
 *     repos by stars, then recency.
 * -----------------------------------------------------------------------
 */

export type ProjectCategory = "ai" | "web";

export type ProjectEntry =
  | string
  | {
      repo: string;
      title?: string;
      description?: string;
      homepage?: string;
      category?: ProjectCategory;
      /** Banner image/GIF path, e.g. "/projects/vexiqora.png" (in /public). */
      image?: string;
    };

export const projectsToShow: readonly ProjectEntry[] = [
  {repo: "micro-gpt",
    category: "ai",
    image: "/projects/micro-gpt.png"
  }, 
   {repo:"ARIS",
    category: "ai",
    image: "/projects/ARIS.png",
   },
  {repo: "Portable-LLM",
    category: "ai",
    image: "/projects/portable-llm.png"
  },

  { repo: "Vexiqora", category: "web",image: "projects/vexiqora1.png" },
  "KazeOS",
  
  "MahiruAI",
];
