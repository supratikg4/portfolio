import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Supratik Gujulvakarthicbabu | Portfolio",
  description:
    "Portfolio of Supratik Gujulvakarthicbabu — computer science, software engineering, machine learning, data science, and photography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans antialiased">
        <Navbar />
        <main className="pt-24 pb-20 min-h-[calc(100vh-80px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
