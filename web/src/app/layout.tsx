import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";

const RootLayout: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="hu" className={`${GeistSans.variable}`}>
    <body className="bg-slate-900 text-white">
      <Navigation />

      {children}

      <Footer />
    </body>
  </html>
);

export default RootLayout;
