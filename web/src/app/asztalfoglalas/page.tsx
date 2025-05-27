import { type NextPage } from "next";
import { createMetadata } from "~/lib/create-metadata";
import { TableReservationForm } from "~/components/table-reservation-form";
import { Title } from "~/components/title";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export const metadata = createMetadata({
  path: "/asztalfoglalas",
  title: "Asztalfoglalás",
  description: "Asztalfoglalás (Foglaljon asztalt a Burger Bárba.)",
});

const Page: NextPage = async () => (
  <main className="my-12 flex flex-col items-center gap-12 px-6">
    <Title>Asztalfoglalás</Title>

    <SignedIn>
      <TableReservationForm />
    </SignedIn>

    <SignedOut>
      <div className="flex flex-col items-center gap-6">
        <div className="flex max-w-[50ch] flex-col gap-2 text-center text-lg">
          <p>
            Kérjük, jelentkezzen be a foglaláshoz!{" "}
            <b>A foglalás csak regisztrált felhasználók számára érhető el.</b>
          </p>
        </div>

        <SignInButton mode="modal">
          <Button>Bejelentkezés</Button>
        </SignInButton>
      </div>
    </SignedOut>
  </main>
);

export default Page;
