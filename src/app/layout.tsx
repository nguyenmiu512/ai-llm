import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NDATrace – Hệ thống quản lý chuỗi cung ứng",
  description: "Nền tảng quản lý và truy xuất nguồn gốc chuỗi cung ứng",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
    </html>
  );
}
