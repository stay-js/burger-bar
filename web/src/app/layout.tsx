import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Navigation } from "~/components/navigation";

const RootLayout: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="hu" className={`${GeistSans.variable}`}>
    <body className="bg-slate-900 text-white">
      <Navigation />

      {children}
    </body>
  </html>
);

export default RootLayout;
