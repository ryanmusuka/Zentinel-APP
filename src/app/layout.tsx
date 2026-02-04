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
      <body className="antialiased">
        <header className="header">
          <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
            
            {/* BRAND SECTION */}
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-300">
                ZIMBABWE REPUBLIC POLICE
              </span>
              <span className="text-2xl font-black tracking-widest text-white">
                ZENTINEL
              </span>
            </div>

            {/* STATUS SECTION (Hardcoded to OFFLINE for now) */}
            <div className="hidden md:flex items-center space-x-3 bg-[#00000040] px-4 py-2 border border-gray-700">
                {/* Red Dot for Offline */}
                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span className="font-mono text-sm tracking-wider uppercase text-white">
                    OFFLINE
                </span>
            </div>

          </div>

          {/* GOLD LINE SEPARATOR */}
          <div className="h-1 w-full bg-zrp-gold"></div>
        </header>
        {children}
      </body>
    </html>
  );
}