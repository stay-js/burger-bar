import { type NextPage } from "next";
import { Title } from "~/components/title";
import { BurgerCard } from "~/components/burger-card";
import { db } from "~/server/db";
import { menu } from "~/server/db/schema";
import { createMetadata } from "~/lib/create-metadata";

export const metadata = createMetadata({
  path: "/menu",
  title: "Menü",
  description: "Menü (A legfinomabb hamburgerek, amiket valaha kóstoltál.)",
});

const Page: NextPage = async () => {
  const data = await db.select().from(menu).execute();

  return (
    <main className="flex flex-col items-center gap-12">
      <Title>Menü</Title>

      <div className="grid grid-cols-1 gap-4 text-black sm:w-4/5 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <BurgerCard key={item.id} burger={item} />
        ))}
      </div>
    </main>
  );
};

export default Page;
