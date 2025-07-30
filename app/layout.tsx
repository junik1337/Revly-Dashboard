import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppLayoutProvider from "./components/Layout";

import "@ant-design/v5-patch-for-react-19";
import "./globals.css";

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
      <body className={`antialiased`}>
        <AntdRegistry>
          <AppLayoutProvider>{children}</AppLayoutProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
