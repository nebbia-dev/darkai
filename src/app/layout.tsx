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
        <body className="bg-gray-50">
            <div className="w-[100vw] bg-gray-50 flex justify-center border-b-1 border-gray-400">
                <img className="py-4" src="/logo.webp" alt="darkai logo"/>
            </div>
            {children}
        </body>
    </html>
  );
}
