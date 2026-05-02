import type { Metadata } from "next";
import { Poppins, Merriweather, JetBrains_Mono } from "next/font/google";
import "@repo/ui/globals.css";
import "./globals.css";
import { Header } from "@/components/layout";
import { Providers } from "@/components/theme/Providers";

const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['400']
});

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CELEB Store",
  description: "This is an ecommerce store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
