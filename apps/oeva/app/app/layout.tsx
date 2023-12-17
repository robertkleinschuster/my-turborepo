import React from "react";
import AppLayout from "../../components/app-layout";

export default function RootLayout({children,}: { children: React.ReactNode; }): React.JSX.Element {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    );
}
