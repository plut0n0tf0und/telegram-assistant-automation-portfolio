import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "n8n Telegram Bot Automation Showcase",
  description: "Interactive portfolio showcase for a self-hosted Telegram menu-based shop assistant automation workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f3f4f6]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

