import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Florida Driving Ranges — Directory",
  description: "Find driving ranges across Florida. Search by city, filter by indoor/outdoor, high-tech features like TrackMan and TopTracer, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
