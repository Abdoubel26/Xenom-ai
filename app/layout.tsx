import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import ContextProvider  from "./context/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xenom AI",
  description: "Xenom AI is an advanced AI chatbot specializing in astrophysics, astronomy, and space exploration. Powered by the Groq API, it provides accurate and insightful responses to your space-related queries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
