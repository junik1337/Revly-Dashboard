import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppLayoutProvider from "./components/Layout";

import "@ant-design/v5-patch-for-react-19";
import "./globals.css";

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Revly Dashboard",
  description: "Simple dashboard for Revly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceCodePro.className} ${sourceCodePro.variable} antialiased`}
      >
        <AntdRegistry>
          <AppLayoutProvider>{children}</AppLayoutProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
