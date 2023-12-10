import React from "react";
import AppLayout from "../../components/app-layout";
import viewport from "../viewport"
import metadata from "../metadata"

export default function RootLayout({children,}: { children: React.ReactNode; }): React.JSX.Element {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    );
}

export {metadata, viewport}