import "./globals.css";

import type { Metadata } from "next";

import { noto } from "@/lib/fonts";
import { T_Props_Children } from "@/app/types";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ZIPIT.admin"
};

type Props = T_Props_Children;

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="hy">
      <body className={`${noto.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
