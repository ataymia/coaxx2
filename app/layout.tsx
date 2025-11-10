import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Coaxx - Premium Ecommerce",
  description: "Discover premium products with exclusive deals and fast shipping",
  keywords: "ecommerce, shopping, premium products, online store",
  openGraph: {
    title: "Coaxx - Premium Ecommerce",
    description: "Discover premium products with exclusive deals and fast shipping",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
