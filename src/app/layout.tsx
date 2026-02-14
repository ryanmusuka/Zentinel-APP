
import type { Metadata } from "next";
import { TicketProvider } from "@/components/tickets/TicketContext";
import "../styles/globals.css";
import HeaderStatus from "@/components/ui/HeaderStatus";

export const metadata: Metadata = {
  title: "Zentinel",
  description: "ZRP Intelligent Traffic Enforcement Application",
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

            <HeaderStatus />

          </div>

          {/* GOLD LINE SEPARATOR */}
          <div className="h-1 w-full bg-zrp-gold"></div>
        </header>
        <TicketProvider>
        {children}
        </TicketProvider>
        <footer className="footer">
          <p className="text-sm text-gray-500 text-center px-6 mx-auto leading-relaxed">
            &copy; {new Date().getFullYear()} Zimbabwe Republic Police. Unauthorised use is a criminal offence. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}