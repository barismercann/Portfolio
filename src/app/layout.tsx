import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from "next/font/google";
import { ClientLayout } from './client-layout';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: '%s | Barış Mercan'
  },
  description: SITE_CONFIG.description,
  keywords: [
    'Barış Mercan',
    'full-stack developer',
    'web developer İstanbul',
    'Next.js developer',
    'React developer',
    'TypeScript',
    'modern web development',
    'özel yazılım geliştirme',
    'freelance developer Turkey',
    'ERP sistem geliştirme',
    'e-ticaret platformu',
    'web application development'
  ],
  authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author.name,
  publisher: SITE_CONFIG.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: '/',
    languages: {
      'tr-TR': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: SITE_CONFIG.author.twitter,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('🔍 ROOT LAYOUT: Starting render...');
  
  // Get messages for the current locale
  const messages = await getMessages();
  console.log('✅ ROOT LAYOUT: Messages loaded, passing to client layout');

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ClientLayout messages={messages}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}