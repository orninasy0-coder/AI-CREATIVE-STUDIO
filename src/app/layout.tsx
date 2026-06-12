import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Creative Studio - Create Beyond Limits",
  description:
    "Generate images, videos, audio, campaigns and content using the world's most advanced AI models. One platform, unlimited possibilities.",
  keywords: [
    "AI",
    "Creative Studio",
    "Image Generation",
    "Video Generation",
    "Audio",
    "AI Models",
  ],
  authors: [{ name: "AI Creative Studio" }],
  icons: {
    icon: "/images/logo-icon.png",
  },
  openGraph: {
    title: "AI Creative Studio - Create Beyond Limits",
    description:
      "Generate images, videos, audio, campaigns and content using the world's most advanced AI models.",
    url: "https://aicreativestudio.ai",
    siteName: "AI Creative Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Creative Studio - Create Beyond Limits",
    description:
      "Generate images, videos, audio, campaigns and content using the world's most advanced AI models.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[#000000] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
