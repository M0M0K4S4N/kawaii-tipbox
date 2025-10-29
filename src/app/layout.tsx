import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MobileProvider } from "@/components/mobile/mobile-provider";
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kawaii Tipbox",
  description: "Design your TipMe donation box in the easy way :D",
  keywords: ["donation", "css", "editor", "tipme", "tipbox", "kawaii", "customization", "โดเนท", "ทิปมี", "กล่องโดเนท"],
  authors: [{ name: "@M0M0K4S4N" }],
  creator: "@M0M0K4S4N",
  publisher: "@M0M0K4S4N",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tipbox.kawaiiii.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kawaii Tipbox",
    description: "Design your TipMe donation box in the easy way :D",
    url: "https://tipbox.kawaiiii.dev",
    siteName: "Kawaii Tipbox",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kawaii Tipbox",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kawaii Tipbox",
    description: "Design your TipMe donation box in the easy way :D",
    images: ["/og-image.png"],
    creator: "@M0M0K4S4N",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  other: {
    "discord:card": "summary_large_image",
    "discord:title": "Kawaii Tipbox",
    "discord:description": "Design your TipMe donation box in the easy way :D",
    "discord:image": "/og-image.png",
    "discord:url": "https://tipbox.kawaiiii.dev",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MobileProvider>
          {children}
        </MobileProvider>
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""}/>
      </body>
    </html>
  );
}