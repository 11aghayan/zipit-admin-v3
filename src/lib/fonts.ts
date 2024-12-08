import { Noto_Sans_Armenian, Inter } from "next/font/google";

export const noto = Noto_Sans_Armenian({ preload: true, subsets: ["latin", "armenian"], weight: ["300", "400", "500", "600", "700", "800", "900"] });
export const inter = Inter({ subsets: ["latin"], weight: "700" });