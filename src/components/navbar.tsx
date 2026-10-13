"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { navLinks, siteConfig } from "@/lib/site-config";
import { useScrolledPast } from "@/hooks/use-scrolled-past";
import { useActiveSection } from "@/hooks/use-active-section";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const scrolled = useScrolledPast(40);
  const activeId = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color] duration-300",
        // PERF: solid-ish background instead of backdrop-blur-xl + a large
        // box-shadow — a blur over scrolling content is re-computed every frame.
        scrolled && "border-line bg-bg/90"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8"
        aria-label="Primary"
      >
        <a
          href="#home"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-sm font-bold text-bg">
            K
          </span>
          <span>{siteConfig.name}</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={cn(
                    "relative transition-colors hover:text-ink",
                    isActive && "text-ink"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Magnetic className="hidden md:inline-block">
            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href="#contact">Let&apos;s talk</a>
            </Button>
          </Magnetic>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="p-2 text-ink md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass overflow-hidden border-t border-line px-5 md:hidden"
          >
            <ul className="flex flex-col gap-1 py-4 text-sm font-medium text-muted">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
