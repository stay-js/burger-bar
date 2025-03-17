import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Navigation } from "~/components/navigation";
import { Footer } from "~/components/footer";

const RootLayout: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="hu" className={`${GeistSans.variable}`}>
    <body className="grid min-h-screen grid-cols-1 grid-rows-[1fr_auto] overflow-x-hidden bg-slate-900 text-white">
      <div>
        <Navigation />

        <div className="my-12">{children}</div>
      </div>

      <Footer />
    </body>
  </html>
);

export default RootLayout;
