import { type Metadata } from "next";

export const createMetadata = ({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata => ({
  metadataBase: new URL("https://burger-bar.znagy.hu"),

  authors: [
    { name: "Alex Péter-Szabó" },
    { name: "Benjámin K. Papp" },
    { name: "Zétény Nagy", url: "https://znagy.hu" },
  ],

  creator: "Alex Péter-Szabó, Benjámin K. Papp, Zétény Nagy",

  keywords: "Burger Bár, Burger, Bár, Menü, Asztalfoglalás, Étel, Hamburger",

  title: `${title} - Burger Bár`,
  description,

  applicationName: "Burger Bár",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: `https://burger-bar.znagy.hu${path}`,
    title: `${title} - Burger Bár`,
    description,
    siteName: "Burger Bár",
    locale: "hu-HU",
  },

  twitter: {
    card: "summary",
    title: `${title} - Burger Bár`,
    description,
  },

  icons: {
    icon: "/favicon.ico",
  },
});
