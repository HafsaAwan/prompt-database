import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterClient from '@/components/ToasterClient'; 
import BackToTopButton from "@/components/BackToTopButton";

// Setup the Poppins font for headings
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

// Setup the Nunito font for body text
const nunito = Nunito({ 
  subsets: ["latin"],
  weight: ['300', '400', '600', '700'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: "AI Did This - Prompt Database",
  description: "A curated database of powerful prompts to spark creativity and productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* The className applies the font variables defined above */}
      <body className={`${poppins.variable} ${nunito.variable} font-nunito`}>
        <div className="flex flex-col min-h-screen">
          <ToasterClient/>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <BackToTopButton />
      </body>
    </html>
  );
}