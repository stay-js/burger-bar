import { type NextPage } from "next";
import { createMetadata } from "~/lib/create-metadata";
import { TableReservationForm } from "~/components/table-reservation-form";
import { Title } from "~/components/title";

export const metadata = createMetadata({
  path: "/asztalfoglalas",
  title: "Asztalfoglalás",
  description: "Asztalfoglalás (Foglaljon asztalt a Burger Bárba.)",
});

const Page: NextPage = () => (
  <main className="my-12 flex flex-col items-center gap-12 px-6">
    <Title>Asztalfoglalás</Title>

    <TableReservationForm />
  </main>
);

export default Page;
