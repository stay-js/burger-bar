import { type NextPage } from "next";
import { createMetadata } from "~/lib/create-metadata";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Title } from "~/components/title";

export const metadata = createMetadata({
  path: "/foglalasaim",
  title: "Faglalásaim",
  description: "Burger Bár - Foglalásaim",
});

const Page: NextPage = async () => {
  const user = await currentUser();

  await auth.protect();

  return (
    <main className="my-12 flex flex-col items-center gap-12 px-6">
      <Title>Foglalásaim</Title>

      <section className="flex w-full flex-col gap-2">
        <div>
          Szia <b>{user?.lastName}!</b>
        </div>
      </section>
    </main>
  );
};

export default Page;
