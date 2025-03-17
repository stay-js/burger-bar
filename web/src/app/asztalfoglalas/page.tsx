import { type NextPage } from "next";
import { createMetadata } from "~/utils/create-metadata";

export const metadata = createMetadata({
  path: "/asztalfoglalas",
  title: "Asztalfoglalás",
  description: "Asztalfoglalás (Foglaljon asztalt a Burger Bárba.)",
});

const Page: NextPage = () => (
  <main>
    <h1 className="text-center">Asztalfoglalás</h1>
  </main>
);

export default Page;
