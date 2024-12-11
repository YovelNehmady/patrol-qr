import type { Metadata } from "next";
import "../scss/styles.scss";
import Header from "./cmps/header";
import Footer from "./cmps/footer";
import { Rubik_Moonrocks, Amatic_SC } from 'next/font/google';
import Head from "next/head";
import Script from "next/script";

// Google Fonts
const Rubik_Moonrocks_init = Rubik_Moonrocks({
  subsets: ['hebrew'],
  weight: '400',
  variable: '--font-rubik-moonrocks'
});

const Amatic_SC_init = Amatic_SC({
  subsets: ['hebrew'],
  weight: '700',
  variable: '--font-Amatic_SC'
});

export const metadata: Metadata = {
  title: "כוח אריאל",
  description: "אפליקציה לניהול פטרולים תקינים",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.ts" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" sizes="512x512" href="/icons/icon-512x512.png" />
      </Head>
      <body
        className={`main-layout ${Rubik_Moonrocks_init.variable} ${Amatic_SC_init.variable}`}
      >
        <Header />
        {children}
        <Footer />
      </body>

      {/* Load the service worker registration script asynchronously */}
      <Script
        src="/register.js"
        strategy="afterInteractive"  // Ensures the script runs after the page is interactive
      />
    </html>
  );
}
