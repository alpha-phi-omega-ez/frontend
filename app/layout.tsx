import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

import { fontMono, fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://apoez.org"),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: "https://apoez.org/",
    siteName: siteConfig.name,
    images: [{ url: "/logo.png" }],
  },
  twitter: {
    title: siteConfig.name,
    description: siteConfig.description,
    card: "summary_large_image",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
