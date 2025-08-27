import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Another Level Cleaning Services | Jonesboro, AR",
  description: "Exterior cleaning pros in Northeast Arkansas: house washing, windows, roof, driveways, gutters. Fast quotes with AI estimator.",
  keywords: ["Jonesboro exterior cleaning","window cleaning NEA","pressure washing Jonesboro AR","roof wash","driveway cleaning","gutter cleaning"],
  openGraph: {
    title: "Another Level Cleaning Services",
    description: "Sparkling results across Northeast Arkansas. Try our AI estimator for instant pricing!",
    type: "website",
    locale: "en_US"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
