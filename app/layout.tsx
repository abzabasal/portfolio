import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abzaek.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abdulazez Zeinu — Full-Stack Engineer",
    template: "%s · Abdulazez Zeinu",
  },
  description:
    "Full-stack engineer building software that stays fast as it scales — Next.js front-ends, Go / TypeScript / Python services, and AWS architectures. Open for new roles.",
  generator: "abzaeko@gmail.com",
  applicationName: "Abdulazez Zeinu — Portfolio",
  authors: [{ name: "Abdulazez Zeinu" }],
  keywords: [
    "full-stack engineer",
    "Next.js",
    "TypeScript",
    "Go",
    "AWS",
    "performance",
    "scalability",
    "Abdulazez Zeinu",
    "portfolio",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: "Abdulazez Zeinu — Full-Stack Engineer",
    description:
      "Full-stack engineer building software that stays fast as it scales.",
    siteName: "Abdulazez Zeinu",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Abdulazez Zeinu logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Abdulazez Zeinu — Full-Stack Engineer",
    description:
      "Full-stack engineer building software that stays fast as it scales.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#131313",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${grotesk.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-PRMYJQGP5Z" />
    </html>
  );
}
