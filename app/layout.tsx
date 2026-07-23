import type { Metadata } from "next";
import "./globals.css";
import "./header-polish.css";
import "./content-pages.css";
import "./editorial-pages.css";
import "./media-polish.css";
import "./hero-polish.css";
import "./walkthrough-polish.css";
import "./placeholder-reset.css";
import "./studio.css";
import "./admin/admin-tools.css";

export const metadata: Metadata = {
  title: "The Living Edit | Timeless spaces",
  description: "Bespoke residential interior design for modern living.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
