import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const title = "CRUST & FIRE — Fire-baked pizza in Multan";
const description =
  "Slow-fermented dough, bold ingredients and a proper flame. Order handcrafted pizza, sides, drinks and desserts from CRUST & FIRE for delivery or pickup.";

export const metadata: Metadata = {
  metadataBase: new URL("https://crustandfire.example"),
  title: {
    default: title,
    template: "%s | CRUST & FIRE",
  },
  description,
  keywords: [
    "pizza Multan",
    "pizza delivery Pakistan",
    "fire baked pizza",
    "CRUST & FIRE",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_PK",
    siteName: "CRUST & FIRE",
    images: [
      {
        url: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Freshly baked pizza from CRUST & FIRE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ed5a24",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}