import "~/styles/globals.css";

import { type Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { Toaster } from "~/components/ui/sonner";

export const viewport: Viewport = {
  colorScheme: "dark",
};

const RootLayout: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="hu" className={`${GeistSans.variable}`}>
    <body className="grid min-h-screen grid-cols-1 grid-rows-[1fr_auto] overflow-x-hidden bg-neutral-800 text-white">
      <div>
        <Navigation />

        {children}
      </div>

      <Footer />

      <Toaster theme="dark" className="text-white" />
    </body>
  </html>
);

export default RootLayout;
