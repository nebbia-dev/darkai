import type { Metadata } from "next";
import "./globals.css";

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
      <body className="flex gap-4 w-[90vw] mx-auto">
        {children}
      </body>
    </html>
  );
}
