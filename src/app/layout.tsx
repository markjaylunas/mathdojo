import { Toaster } from "@/src/components/ui/toaster";
import { SiteHeader } from "@components/layout/site-header";
import { ThemeProvider } from "@components/theme/theme-provider";
import { auth } from "@lib/auth";
import { cn } from "@lib/utils";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Mathwars | Makje",
  description: "Mathwars is a fun way to compete with your friends in math.",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>

          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
