import type { Metadata } from "next";
import { Architects_Daughter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout";
import { Providers } from "@/components/theme/Providers";

const architectsDaughter = Architects_Daughter({
  weight: "400",
  variable: "--font-architects-daughter",
  subsets: ["latin"],
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
      className={`${architectsDaughter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className={`dark:bg-zinc-700 dark:text-white`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
