import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MRZ Gang — Official",
  description: "Creators’ collective powered by gaming, IRL chaos, and Kerala vibes.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "MRZ Gang — Official",
    description: "Gaming, live streams, IRL events, and collabs.",
    images: ["/og.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "MRZ Gang — Official",
    description: "Gaming, live streams, IRL events, and collabs.",
    images: ["/og.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased selection:bg-cyan-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
