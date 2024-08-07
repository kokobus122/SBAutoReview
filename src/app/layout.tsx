import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skyblock Auto Review",
  description: "Created by kokobus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Navbar />
        <main className="min-h-screen max-w-7xl mx-auto h-full text-white mt-12 px-2 xl:px-0">
          {children}
        </main>
      </body>
    </html>
  );
}
