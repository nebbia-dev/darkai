import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Work_Sans } from "next/font/google";
import "./globals.css";
import React from "react";

const worksans = Work_Sans({
    subsets: ['latin'],
    display: "swap",
    variable: '--font-work'
});

export const metadata: Metadata = {
  title: "Darkai - Grillz Configurator",
  description: "Your next grillz is just one click away",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${worksans.variable}`}>
    <head>
        <link
            rel="prefetch"
            crossOrigin="anonymous"
            href="https://www.gstatic.com/draco/versioned/decoders/1.5.5/draco_wasm_wrapper.js"
        />
        <link
            rel="prefetch"
            crossOrigin="anonymous"
            href="https://www.gstatic.com/draco/versioned/decoders/1.5.5/draco_decoder.wasm"
        />

    </head>
    <body>
    <AppRouterCacheProvider>
        {children}
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
