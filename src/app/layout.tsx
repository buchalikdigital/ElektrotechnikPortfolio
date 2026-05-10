import type { Metadata } from "next";
import { Rajdhani, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMPERA GmbH – Elektrotechnik Frankfurt | Meisterbetrieb seit 1998",
  description:
    "AMPERA GmbH – Ihr Meisterbetrieb für Elektroinstallation, Photovoltaik, Smart Home und Industrie-Elektrik in Frankfurt und der Rhein-Main-Region. VDE-zertifiziert. Festpreisangebot.",
  keywords:
    "Elektriker Frankfurt, Elektroinstallation Frankfurt, Photovoltaik Frankfurt, Smart Home Frankfurt, E-Check Frankfurt, Meisterbetrieb Elektro",
  openGraph: {
    title: "AMPERA GmbH – Elektrotechnik Frankfurt",
    description: "VDE-zertifizierter Meisterbetrieb für Elektroinstallation, Photovoltaik & Smart Home in Frankfurt.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${rajdhani.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
