// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/primary/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "@/context/SessionContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} tracking-wide`}
      >
        <SessionProvider>
          <NextTopLoader />
          <Navbar />
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
