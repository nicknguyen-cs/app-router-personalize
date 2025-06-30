import type { Metadata } from "next";
import LivePreviewInitComponent from "./sdk/LivePreviewSDK";
import LyticsTracking from "./sdk/LyticsTracker";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS Sandbox",
  description: "WeeWoo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <LyticsTracking />
        <LivePreviewInitComponent />
        <main>{children}</main>
      </body>
    </html>
  );
}
