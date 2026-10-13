import { aboutChips, aboutStats } from "@/lib/site-config";
import { getIcon } from "@/lib/icons";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { CountUp } from "@/components/ui/count-up";

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.26em] text-muted">
            {"// about me"}
          </span>
          <h2 className="mb-4 mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Still learning, always building.
          </h2>
          <p className="leading-relaxed text-muted">
            I&apos;m a student developer, not an industry expert — and I like
            it that way. Every project on this site exists because I wanted
            to understand something new, not because I&apos;d already
            mastered it.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-5">
          <Reveal direction="left" className="md:col-span-3">
            <GlassCard className="h-full p-8 md:p-10">
              <p className="mb-5 text-lg leading-relaxed text-ink/90">
                I&apos;m currently exploring{" "}
                <span className="font-medium text-ink">
                  Artificial Intelligence
                </span>
                ,{" "}
                <span className="font-medium text-ink">
                  Machine Learning
                </span>{" "}
                and{" "}
                <span className="font-medium text-ink">
                  Large Language Models
                </span>
                , alongside picking up{" "}
                <span className="font-medium text-ink">
                  full-stack development
                </span>
                ,{" "}
                <span className="font-medium text-ink">Linux</span> and{" "}
                <span className="font-medium text-ink">open source</span>{" "}
                along the way.
              </p>
              <p className="mb-5 leading-relaxed text-muted">
                I build projects mainly to learn — an AI voice assistant to
                understand automation, a GPT model from scratch to understand
                transformers, small tools to get comfortable with Linux. I
                don&apos;t always get it right the first time, and
                that&apos;s kind of the point.
              </p>
              <p className="leading-relaxed text-muted">
                I also lean on AI tools regularly — to brainstorm ideas,
                debug tricky errors, and speed up how fast I learn new
                concepts. I see that as part of how developers learn today,
                not something to hide.
              </p>

              <div className="mt-9 grid grid-cols-3 gap-4 border-t border-line pt-8">
                {aboutStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <CountUp
                      target={stat.value}
                      className="font-display text-3xl font-bold text-gradient-brand"
                    />
                    <p className="mt-1 font-mono text-xs text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <RevealStagger className="grid grid-cols-2 gap-4 md:col-span-2">
            {aboutChips.map((chip) => {
              const Icon = getIcon(chip.icon);
              return (
                <RevealStaggerItem key={chip.label} direction="scale">
                  <GlassCard className="flex flex-col items-start gap-3 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg text-ink">
                      <Icon size={20} />
                    </div>
                    <p className="text-sm font-medium">{chip.label}</p>
                  </GlassCard>
                </RevealStaggerItem>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
