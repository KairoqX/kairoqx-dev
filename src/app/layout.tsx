import type { Metadata, Viewport } from "next";
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { ScrollProgressBar } from "@/components/ui/scroll-progress-bar";
import { BackToTop } from "@/components/ui/back-to-top";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandPaletteHost } from "@/components/command-palette-host";
import Script from "next/script";
import { PageLoader } from "@/components/page-loader";
import { ScrollToTopOnLoad } from "@/components/scroll-to-top-on-load";

// PERF: no explicit `weight` list -> Next loads each family as a single
// variable-font file instead of a separate file per weight (was 10 font
// files across the three families).
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  // Favicon package lives in /public (favicon.ico, favicon-16x16.png,
  // favicon-32x32.png, apple-touch-icon.png, android-chrome-*.png).
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f3f3f1",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  sameAs: [
    `https://github.com/${siteConfig.githubUsername}`,
    "https://x.com/kairoqx",
    "https://www.instagram.com/_kairoqx_/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Apply the saved theme before first paint (prevents a flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}`,
          }}
        />
        {/*
          Disables the browser's native scroll-restoration BEFORE hydration
          — not inside a React effect, which runs too late (the browser
          restores + paints the previous scroll position as part of its
          normal load process, often before any React code executes at
          all). `beforeInteractive` is the earliest point Next.js exposes
          for running JS, giving this the best chance to win that race.
          <ScrollToTopOnLoad /> below is kept as a same-behavior backup for
          the (rare) case a browser still restores scroll after this runs.
        */}
        <Script id="disable-scroll-restoration" strategy="beforeInteractive">
          {`
            if ('scrollRestoration' in window.history) {
              window.history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full font-body">
        <a
          href="#main"
          className="fixed left-4 top-[-60px] z-[999] rounded-md bg-ink px-4 py-2.5 text-bg transition-[top] duration-300 focus:top-4"
        >
          Skip to content
        </a>

        <ScrollToTopOnLoad />
        <PageLoader />
        <ScrollProgressBar />
        <Navbar />

        <main id="main" className="relative z-10">
          {children}
        </main>

        <Footer />
        <BackToTop />
        <CommandPaletteHost />
      </body>
    </html>
  );
}
