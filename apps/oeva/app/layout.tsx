import type {Metadata, Viewport} from "next";
import "./globals.css";
import "../fonts/Betreiber-Logos/css/Betreiber-Logos.css"
import "../fonts/Zuggattungen/css/Zuggattungen.css"
import React from "react";
import {generateStartupImages} from "./splashscreen/[id]/route";

export const metadata: Metadata = {
    title: "OeVA",
    description: "OeVA",
    robots: {
        index: false,
        follow: false
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: 'OeVA',
        startupImage: generateStartupImages()
    },
};

export const viewport: Viewport = {
    width: "device-width",
    userScalable: false,
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
    themeColor: '#000000',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}
