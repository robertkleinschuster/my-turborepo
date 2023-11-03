import type { Metadata, Viewport } from "next";
import AppLayout from "../../components/app-layout";

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
    startupImage: [
      { url: 'splashscreen/iphone-12-pro-max', media: 'screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
    ],
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
    <AppLayout>
      {children}
    </AppLayout>
  );
}
