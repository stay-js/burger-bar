import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Web",
  description: "Web",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
