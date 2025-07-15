import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/primary/navbar/Navbar";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth/auth";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garanti",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} tracking-wide`}
      >
        <NextTopLoader />
        <Navbar session={session || null} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
