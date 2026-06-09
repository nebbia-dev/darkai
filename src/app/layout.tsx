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

const siteUrl = "https://www.darkai-lab.com";
const siteTitle = "DARKAI - Grillz Configurator";
const siteDescription =
    "Design custom gold and diamond grillz online with DARKAI, the dental jewelry configurator for personalized teeth jewelry.";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: siteTitle,
        template: "%s | DARKAI",
    },
    description: siteDescription,
    applicationName: "DARKAI",
    keywords: [
        "DARKAI",
        "grillz",
        "custom grillz",
        "gold grillz",
        "diamond grillz",
        "dental jewelry",
        "teeth jewelry",
        "grillz configurator",
    ],
    authors: [{ name: "DARKAI" }],
    creator: "DARKAI",
    publisher: "DARKAI",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        siteName: "DARKAI",
        title: siteTitle,
        description: siteDescription,
        images: [
            {
                url: "/logo.png",
                width: 1700,
                height: 303,
                alt: "DARKAI logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
        images: ["/logo.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    category: "jewelry",
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
        <link rel="stylesheet" href="https://use.typekit.net/gqu6jpz.css"/>

        {/* meta tags */}
        <meta name="loader-text" content="DARKAI - The world's first dental jewelry configurator"/>

        <meta name="full-design" content="DARKAI - Full gold teeth grillz design"/>
        <meta name="frame-design" content="DARKAI - Frame gold teeth grillz design"/>
        <meta name="spacer-design" content="DARKAI - Spacer gold teeth grillz design"/>
        <meta name="bar-design" content="DARKAI - Bar gold teeth grillz design"/>
        <meta name="bezel-design" content="DARKAI - Bezel gold teeth grillz design"/>
        <meta name="enamel-design" content="DARKAI - Enamel gold teeth grillz design"/>

        <meta name="polished-finish" content="DARKAI - Polished gold teeth grillz design"/>
        <meta name="sandblasted-finish" content="DARKAI - Sandblasted gold teeth grillz design"/>
        <meta name="diamond-cut-finish" content="DARKAI - Diamond cut gold teeth grillz design"/>
        <meta name="mosaic-pave" content="DARKAI - Mosaic stones gold teeth grillz design"/>
        <meta name="round-pave" content="DARKAI - Round stones teeth grillz design"/>
        <meta name="hexagon-pave" content="DARKAI - Hexagon stones gold teeth grillz design"/>
        <meta name="princess-pave" content="DARKAI - Princess stones gold teeth grillz design"/>
        <meta name="baguette-pave" content="DARKAI - Baguette stones gold teeth grillz design"/>

        <meta name="yellow-gold" content="DARKAI - Yellow gold teeth grillz design"/>
        <meta name="rose-gold" content="DARKAI - Rose gold teeth grillz design"/>
        <meta name="white-gold" content="DARKAI - White gold teeth grillz design"/>
        <meta name="black-gold" content="DARKAI - Black gold teeth grillz design"/>

        <meta name="white-diamond-lab" content="DARKAI - White diamonds gold teeth grillz design"/>
        <meta name="white-diamond-natural" content="DARKAI - Natural diamonds gold teeth grillz design"/>
        <meta name="brown-diamond-natural" content="DARKAI - Brown diamonds gold teeth grillz design"/>
        <meta name="black-diamond-natural" content="DARKAI - Black diamonds gold teeth grillz design"/>
        <meta name="ruby-lab" content="DARKAI - Ruby stones gold teeth grillz design"/>
        <meta name="emerald-lab" content="DARKAI - Emerald stones gold teeth grillz design"/>
        <meta name="blue-sapphire-lab" content="DARKAI - Blue sapphire gold teeth grillz design"/>
        <meta name="yellow-sapphire-lab" content="DARKAI - Yellow sapphire gold teeth grillz design"/>
        <meta name="pink-sapphire-lab" content="DARKAI - Pink sapphire gold teeth grillz design"/>
        <meta name="aquamarine-lab" content="DARKAI - Aquamarine gold teeth grillz design"/>
        <meta name="amethyst-lab" content="DARKAI - Amethyst gold teeth grillz design"/>
        <meta name="glitch-lab" content="DARKAI - Glitch stones gold teeth grillz design"/>
        <meta name="camo-lab" content="DARKAI - Camo stones gold teeth grillz design"/>

        <meta name="packaging-case" content="DARKAI - Grillz packaging case customization"/>
        <meta name="packaging-velvet" content="DARKAI - Grillz packaging interior customization"/>
        <meta name="packaging-gold-details" content="DARKAI - Grillz packaging hardware customization"/>
        <meta name="packaging-custom-text" content="DARKAI - Grillz packaging text customization"/>

        <meta name="optional-premium-packaging" content="DARKAI - Premium packaging customization"/>

        <meta name="carats" content="DARKAI - Gold carats grillz selection"/>
        <meta name="10K" content="DARKAI - Gold grillz in 10 carats"/>
        <meta name="14K" content="DARKAI - Gold grillz in 14 carats"/>
        <meta name="18K" content="DARKAI - Gold grillz in 18 carats"/>

        <meta name="dental-scan-reminder" content="DARKAI Checkout - Dental scan upload"/>

        <meta name="shipping-information" content="DARKAI Checkout - Add shipping information"/>
        <meta name="billing-information" content="DARKAI Checkout - Add billing information"/>
        <meta name="name" content="DARKAI Checkout - Add name information"/>
        <meta name="last-name" content="DARKAI Checkout - Add last name information"/>
        <meta name="email" content="DARKAI Checkout - Add email contact information"/>
        <meta name="address" content="DARKAI Checkout - Add address information"/>
        <meta name="city" content="DARKAI Checkout - Add city information"/>
        <meta name="postal-code" content="DARKAI Checkout - Add postal code information"/>
        <meta name="country" content="DARKAI Checkout - Add country information"/>
        <meta name="phone" content="DARKAI Checkout - Add phone contact information"/>

        <meta name="order-confirmation" content="DARKAI Checkout - Order payment successful"/>
    </head>
    <body>
    <AppRouterCacheProvider>
        {children}
    </AppRouterCacheProvider>
    </body>
    </html>
  );
}
