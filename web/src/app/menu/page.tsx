import { type NextPage } from "next";
import { unstable_cache } from "next/cache";
import { Title } from "~/components/title";
import { BurgerCard } from "~/components/burger-card";
import { createMetadata } from "~/lib/create-metadata";
import { db } from "~/server/db";
import { menu } from "~/server/db/schema";

export const metadata = createMetadata({
  path: "/menu",
  title: "Menü",
  description: "Menü (A legfinomabb hamburgerek, amiket valaha kóstoltál.)",
});

export const revalidate = 60;

const getCachedMenu = unstable_cache(
  () => db.select().from(menu).execute(),
  ["menu"],
  { revalidate: 60, tags: ["menu"] },
);

const Page: NextPage = async () => {
  const menu = await getCachedMenu();

  return (
    <main className="my-12 flex flex-col items-center gap-12 px-6">
      <Title>Menü</Title>

      <div className="grid grid-cols-1 gap-6 text-black sm:w-4/5 md:grid-cols-2 lg:grid-cols-3">
        {menu.map((item) => (
          <BurgerCard key={item.id} burger={item} />
        ))}
      </div>
    </main>
  );
};

export default Page;
