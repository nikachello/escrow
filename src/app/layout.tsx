import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "@/context/SessionContext";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/primary/navbar/Navbar";

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
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} tracking-wide`}
      >
        <SessionProvider>
          <NextTopLoader />
          <NextIntlClientProvider>
            <Navbar />
            {children}
          </NextIntlClientProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
