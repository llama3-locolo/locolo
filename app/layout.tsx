import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./markdown.css";

// const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Locolo",
  description: "Discover local events!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
