import "~/styles/globals.css";

import { type Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";
import { Toaster } from "~/components/ui/sonner";

export const viewport: Viewport = {
  colorScheme: "dark",
};

const RootLayout: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => (
  <ClerkProvider>
    <html lang="hu" className={`${GeistSans.variable}`}>
      <body className="dark overflow-x-hidden bg-neutral-800 text-white">
        <div>
          <Navigation />

          {children}
        </div>

        <Footer />

        <Toaster />
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
