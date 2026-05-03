import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-heading' });

export const metadata: Metadata = {
  title: "SL HUB COMPUTER | The New Experience of Technology",
  description: "High-quality branded and used computers, monitors, mobile phones, and accessories in Deiyandara, Sri Lanka.",
};

import { createClient } from "@/utils/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('*').single();

  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";
  const isAdminPage = pathname.includes("/tarusha/dashboard");

  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen flex flex-col bg-slate-950 text-foreground`} suppressHydrationWarning>
        {!isAdminPage && <Navbar settings={settings} />}
        <main className="flex-1">
          {children}
        </main>
        {!isAdminPage && <Footer settings={settings} />}
        {!isAdminPage && <MobileBottomNav settings={settings} />}
        {!isAdminPage && <WhatsAppButton settings={settings} />}
        <Toaster />
      </body>
    </html>
  );
}
