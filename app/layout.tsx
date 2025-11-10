import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import AgeGate from '@/components/AgeGate';

export const metadata: Metadata = {
  title: "Coaxx - Premium Lingerie & Intimate Apparel",
  description: "Discover sultry, tasteful intimate apparel with exclusive deals and discreet shipping",
  keywords: "lingerie, intimate apparel, premium lingerie, online store, body-safe",
  openGraph: {
    title: "Coaxx - Premium Lingerie & Intimate Apparel",
    description: "Discover sultry, tasteful intimate apparel with exclusive deals and discreet shipping",
    type: "website",
    siteName: "Coaxx",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coaxx - Premium Lingerie & Intimate Apparel",
    description: "Discover sultry, tasteful intimate apparel with exclusive deals and discreet shipping",
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
        <AgeGate />
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
