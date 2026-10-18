import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Caveat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const title = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-title" });
const hand = Caveat({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-hand" });
const ui = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-ui" });

export const metadata: Metadata = {
  title: "Para Mamá ❤️",
  description: "Te hice un regalito especial por tu día. Abrilo cuando tengas un ratito.",
  openGraph: {
    title: "Para Mamá ❤️",
    description: "Te hice un regalito especial por tu día. Abrilo cuando tengas un ratito.",
    type: "website",
    locale: "es_AR",
  },
};
export const viewport: Viewport = { themeColor: "#FDFBF7", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${title.variable} ${hand.variable} ${ui.variable}`}>
      <body>{children}</body>
    </html>
  );
}
