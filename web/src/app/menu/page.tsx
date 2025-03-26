import { type NextPage } from "next";
import { Title } from "~/components/title";
import { BurgerCard } from "~/components/burger-card";
import { createMetadata } from "~/lib/create-metadata";
import { getCachedMenu } from "~/lib/get-cached-menu";

export const metadata = createMetadata({
  path: "/menu",
  title: "Menü",
  description: "Menü (A legfinomabb hamburgerek, amiket valaha kóstoltál.)",
});

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
