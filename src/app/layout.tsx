import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rose Search - Creative Search Engine",
  description: "A beautiful, creative search engine with multi-language support, voice search, real image search, and extensive customization options.",
  keywords: ["rose search", "search engine", "creative", "multi-language", "voice search", "image search", "themes", "animations"],
  authors: [{ name: "Rose Search Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Rose Search",
    description: "Experience web search with creative beauty and powerful features",
    url: "https://rose-search.vercel.app",
    siteName: "Rose Search",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rose Search",
    description: "Creative search engine with multi-language support and voice search",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
