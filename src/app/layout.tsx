import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MobileProvider } from "@/components/mobile/mobile-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tipbox Style | Donation box CSS editor",
  description: "Design your TipMe donation box in the easy way :D",
  keywords: ["donation", "css", "editor", "tipme", "tipbox", "style", "customization"],
  authors: [{ name: "Tipbox Style" }],
  creator: "Tipbox Style",
  publisher: "Tipbox Style",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tipbox-style-app.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tipbox Style | Donation box CSS editor",
    description: "Design your TipMe donation box in the easy way :D",
    url: "https://tipbox-style-app.vercel.app",
    siteName: "Tipbox Style",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tipbox Style - Donation box CSS editor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tipbox Style | Donation box CSS editor",
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
    "discord:title": "Tipbox Style | Donation box CSS editor",
    "discord:description": "Design your TipMe donation box in the easy way :D",
    "discord:image": "/og-image.png",
    "discord:url": "https://tipbox-style-app.vercel.app",
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
      </body>
    </html>
  );
}