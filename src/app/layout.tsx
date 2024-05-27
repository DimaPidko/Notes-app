import React from 'react'
import { Providers } from '@/provider/provider'

import type { Metadata } from "next";
import type { NextFont } from 'next/dist/compiled/@next/font'
import { Inter } from "next/font/google";
import "./globals.css";

const inter : NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notice app",
  description: "This is notice app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
