import type { Metadata } from "next";
import { Noto_Sans_Armenian } from "next/font/google";

import "./globals.css";

import { T_Props_Children } from "./types";

export const metadata: Metadata = {
  title: "ZIPIT Admin"
};

const noto = Noto_Sans_Armenian({ preload: true, subsets: ["latin", "armenian"], weight: ["300", "400", "500", "600", "700", "800", "900"] })

type Props = T_Props_Children;

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="hy">
      <body className={`${noto.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
