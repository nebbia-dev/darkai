import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";
import React from "react";

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
    <html lang="en">
        <body className="bg-gray-200">
        <AppRouterCacheProvider>
            <div className="w-[100vw] flex justify-center">
                <img className="py-6 w-[132px]" src="/logo.png" alt="darkai logo"/>
            </div>
            {children}
        </AppRouterCacheProvider>
        </body>
    </html>
  );
}
