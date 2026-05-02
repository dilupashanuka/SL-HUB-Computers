import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SL HUB COMPUTER | The New Experience of Technology",
  description: "High-quality branded and used computers, monitors, mobile phones, and accessories in Deiyandara, Sri Lanka.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";
  const isAdminPage = pathname.includes("/tarusha/dashboard");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {!isAdminPage && <Navbar />}
          <main className="flex-1">
            {children}
          </main>
          {!isAdminPage && <Footer />}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

