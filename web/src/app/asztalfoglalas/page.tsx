import { type NextPage } from "next";
import { Title } from "~/components/title";
import { createMetadata } from "~/utils/create-metadata";

export const metadata = createMetadata({
  path: "/asztalfoglalas",
  title: "Asztalfoglalás",
  description: "Asztalfoglalás (Foglaljon asztalt a Burger Bárba.)",
});

const Page: NextPage = () => (
  <main className="flex flex-col items-center gap-12">
    <Title>Asztalfoglalás</Title>
  </main>
);

export default Page;
