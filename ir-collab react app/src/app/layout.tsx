import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IR Collab - Research Collaboration Platform",
  description:
    "A platform for researchers to collaborate, share ideas, and build networks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
