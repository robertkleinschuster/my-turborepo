import "./globals.css";
import "../fonts/Betreiber-Logos/css/Betreiber-Logos.css"
import "../fonts/Zuggattungen/css/Zuggattungen.css"
import React from "react";
import viewport from "./viewport"
import metadata from "./metadata"

export default function RootLayout({children,}: { children: React.ReactNode; }): React.JSX.Element {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}

export {metadata, viewport}