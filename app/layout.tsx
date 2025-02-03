import type { Metadata } from "next";
import { Noto_Serif_JP, Song_Myung, Yuji_Syuku } from "next/font/google";
import "./globals.css";

export const yuji = Yuji_Syuku({
  subsets: ["latin"],
  weight: ["400"],
});

export const jSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const songMyung = Song_Myung({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "TangoDojo",
  description: "일본어 어휘력을 수련하는 도장",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
