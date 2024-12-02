import type { Metadata } from "next";
import "../scss/styles.scss";
import Header from "./cmps/header";
import Footer from "./cmps/footer";
import {Rubik_Moonrocks , Amatic_SC } from 'next/font/google';

//Google Fonts
const Rubik_Moonrocks_init = Rubik_Moonrocks({
  subsets:['hebrew'],
  weight:'400',
  variable:'--font-rubik-moonrocks'
})

const Amatic_SC_init = Amatic_SC({
  subsets:['hebrew'],
  weight:'700',
  variable:'--font-Amatic_SC'
})

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
      <body
        className={`main-layout ${Rubik_Moonrocks_init.variable} ${Amatic_SC_init.variable}`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};;