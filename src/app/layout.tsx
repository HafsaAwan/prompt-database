import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // 1. Import the Footer
import { Toaster } from 'react-hot-toast';
import BackToTopButton from "@/components/BackToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Did This - Prompt Database",
  description: "Find the best AI prompts for any use case.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* apply our custom background color directly here using a Tailwind class  */}
      <body className={`${inter.className} bg-brand-background`}>
        <div className="flex flex-col min-h-screen">
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: { background: '#27272a', color: '#fafafa', border: '1px solid #3f3f46' },
              success: {
                style: { background: '#166534', color: 'white' },
                iconTheme: { primary: 'white', secondary: '#166534' },
              },
              error: {
                style: { background: '#991b1b', color: 'white' },
                iconTheme: { primary: 'white', secondary: '#991b1b' },
              },
            }}
          />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer /> {/* 2. Add the Footer at the end */}
        </div>
        <BackToTopButton />
      </body>
    </html>
  );
}
