import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/site-config";
import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import { TypedText } from "@/components/typed-text";

// Feature row (mirrors the icon row on the project banners).
const features = [
  { icon: "cpu", label: "PyTorch" },
  { icon: "code", label: "Python" },
  { icon: "terminal", label: "Linux" },
];

/**
 * Hero — styled after the project banners: big heavy name, wide-spaced
 * uppercase tagline, thin vertical rule, icon feature row, dark angled
 * corner blocks, and a dark terminal chip over a framed photo.
 *
 * Server Component: no animation libraries, no canvas, no mouse tracking.
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28"
    >
      {/* Decorative corner geometry (static CSS shapes) */}
      <div
        aria-hidden="true"
        className="shape-strip pointer-events-none absolute -left-4 top-[38%] hidden h-40 w-24 md:block"
      />
      <div
        aria-hidden="true"
        className="shape-tri-l pointer-events-none absolute -left-1 top-[46%] hidden h-24 w-12 md:block"
      />
      <div
        aria-hidden="true"
        className="shape-tri-br pointer-events-none absolute bottom-0 right-0 h-28 w-28 sm:h-40 sm:w-40 md:h-52 md:w-52"
      />
      <div
        aria-hidden="true"
        className="rule-diagonal pointer-events-none absolute bottom-6 right-24 hidden w-48 -rotate-[48deg] md:block"
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-5 md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div>
          <Reveal>
            <p className="mb-6 font-mono text-xs tracking-wide text-muted">
              <span className="text-ink">&gt;</span> currently_learning: AI &amp; ML
              <br />
              <span className="text-ink">&gt;_</span>
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex items-stretch gap-6">
              <div aria-hidden="true" className="hidden w-px bg-ink sm:block" />
              <div>
                <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                  {siteConfig.name}
                </h1>
                <p className="mt-4 min-h-[1.75rem] font-display text-sm font-light uppercase tracking-[0.28em] text-ink/80 sm:text-base">
                  <TypedText />
                </p>
                <p className="mt-3 font-display text-sm tracking-[0.12em] text-muted">
                  Student <span className="mx-1.5">•</span> Builder{" "}
                  <span className="mx-1.5">•</span> Open Source
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-9 mt-9 max-w-xl text-lg leading-relaxed text-muted">
              A student developer exploring Artificial Intelligence, Machine
              Learning and Large Language Models — one project at a time.
              I&apos;m not an expert yet; I&apos;m a curious builder who learns
              by shipping things, breaking them, and figuring out why.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button asChild>
                  <a href="#projects" className="inline-flex items-center gap-2">
                    View Projects
                    <ArrowRight size={16} strokeWidth={2.2} />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="ghost">
                  <a href="#contact">Get in Touch</a>
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mb-10 flex max-w-md items-stretch">
              {features.map((f, i) => {
                const Icon = getIcon(f.icon);
                return (
                  <div
                    key={f.label}
                    className={`flex flex-1 flex-col items-center gap-2 px-3 py-1 ${
                      i > 0 ? "border-l border-line" : ""
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.6} className="text-ink" />
                    <span className="text-center text-xs text-ink/80">
                      {f.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex items-center gap-5">
              <span className="font-mono text-xs uppercase tracking-[0.26em] text-muted">
                Find me
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => {
                  const Icon = getIcon(s.icon);
                  return (
                    <Magnetic key={s.href} strength={0.4}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="glass flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:border-ink hover:text-ink"
                      >
                        <Icon size={18} />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Framed photo with an offset panel behind it + a dark terminal chip */}
        <Reveal direction="scale" className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-xl bg-ink/[.07]"
          />
          <div className="relative aspect-square overflow-hidden rounded-xl border border-line bg-surface">
            <Image
              src="https://avatars.githubusercontent.com/u/190733021?v=4&t=1"
              alt={`${siteConfig.name} profile photo`}
              width={420}
              height={420}
              className="h-full w-full object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
              sizes="(min-width: 768px) 384px, 90vw"
              priority
            />
          </div>

          <div className="absolute -bottom-6 -left-4 w-56 rounded-lg bg-panel p-3.5 font-mono text-[0.7rem] leading-relaxed text-white shadow-[6px_6px_0_0_rgba(22,22,22,0.1)] sm:-left-8">
            <div className="mb-2 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="h-2 w-2 rounded-full bg-white" />
              <span className="h-2 w-2 rounded-full bg-white" />
            </div>
            <p className="text-white/90">&gt; kairoqx</p>
            <p className="text-white/60">&gt; loading projects...</p>
            <p className="text-white/90">&gt; ready.</p>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-ink md:block"
      >
        <svg
          className="animate-float-slow"
          width="22"
          height="34"
          viewBox="0 0 22 34"
          fill="none"
        >
          <rect
            x="1"
            y="1"
            width="20"
            height="32"
            rx="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="11" cy="9" r="2" fill="currentColor" />
        </svg>
      </a>
    </section>
  );
}
