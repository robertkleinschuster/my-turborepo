import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppLayout from "../components/app-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OeVA",
  description: "OeVA",
  robots: {
    index: false,
    follow: false
  },
  viewport: {
    width: "device-width",
    userScalable: false,
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
  },
  themeColor: '#2b5797',
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: 'OeVA',
    startupImage: [
      { url: 'splashscreen/iphone-12-pro-max', media: 'screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
