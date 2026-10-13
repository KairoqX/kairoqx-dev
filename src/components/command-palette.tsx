"use client";

import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Search } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { navLinks, siteConfig, socialLinks } from "@/lib/site-config";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  function go(href: string) {
    onOpenChange(false);
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-ink/40 pt-[15vh]"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-lg overflow-hidden rounded-xl"
          >
            <Command
              label="Command palette"
              className="[&_[cmdk-input]]:bg-transparent [&_[cmdk-input]]:outline-none"
            >
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <Search size={16} className="text-muted" />
                <Command.Input
                  autoFocus
                  placeholder="Jump to a section, or open a link..."
                  className="w-full bg-transparent py-1 text-sm text-ink placeholder:text-ink/30"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-muted">
                  Esc
                </kbd>
              </div>

              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="px-3 py-6 text-center text-sm text-muted">
                  No results found.
                </Command.Empty>

                <Command.Group
                  heading="Navigate"
                  className="px-1 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
                >
                  {navLinks.map((link) => (
                    <Command.Item
                      key={link.href}
                      onSelect={() => go(link.href)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink aria-selected:bg-ink/[.07]"
                    >
                      {link.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group
                  heading="Links"
                  className="px-1 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
                >
                  <Command.Item
                    onSelect={() =>
                      go(`https://github.com/${siteConfig.githubUsername}`)
                    }
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink aria-selected:bg-ink/[.07]"
                  >
                    <GithubIcon size={15} /> Open GitHub profile
                  </Command.Item>
                  <Command.Item
                    onSelect={() =>
                      go(
                        socialLinks.find((s) => s.icon === "mail")?.href ??
                          `mailto:${siteConfig.email}`
                      )
                    }
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink aria-selected:bg-ink/[.07]"
                  >
                    <Mail size={15} /> Send an email
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
