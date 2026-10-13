# KairoqX — Portfolio

Next.js + Tailwind + Framer Motion portfolio.

## Choosing which projects are shown

Edit **`src/data/projects.ts`** — add or remove a GitHub repo name from the
`projectsToShow` list. Description, language, stars, topics and demo link are
pulled live from GitHub (refreshed hourly). Projects appear in list order.
See the comment at the top of that file for the optional per-project overrides
(`title`, `description`, `homepage`, `category`).

## Site content

Everything else (name, links, skills, certificates, timeline) lives in
`src/lib/site-config.ts`.

## Theme

Clean monochrome "paper & ink" look. All colors are tokens at the top of
`src/app/globals.css` (`--color-bg`, `--color-ink`, `--color-line`,
`--color-panel`, `--color-muted`) — change them there and the whole site
follows. Headings use Montserrat, body Inter, details JetBrains Mono.

## Favicon

The favicon package lives in `public/` (`favicon.ico`, `favicon-16x16.png`,
`favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-*.png`,
`site.webmanifest`) and is wired up in `src/app/layout.tsx`.

## Performance notes

- No `backdrop-filter` / `mix-blend-mode` / animated full-screen backgrounds.
- Scroll reveals are CSS-driven (`src/components/ui/reveal.tsx` +
  `src/lib/in-view.ts`) and only animate `opacity` / `transform`.
- Scroll progress uses a Framer `MotionValue` (no React re-renders on scroll).
- The command palette (`cmdk`) is lazy-loaded the first time it's opened.

## Development

```bash
npm install
npm run dev
```
