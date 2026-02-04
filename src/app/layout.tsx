// This is the "Parent" of your entire website
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Zentinel",
  description: "ZRP Intelligent Traffic Enforcement",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* This body tag will now use the ZRP Navy and Grey from globals.css */}
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}