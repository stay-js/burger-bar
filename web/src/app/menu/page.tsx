import { type NextPage } from "next";
import Image from "next/image";
import { db } from "~/server/db";
import { menu } from "~/server/db/schema";
import { createMetadata } from "~/utils/create-metadata";

export const metadata = createMetadata({
  path: "",
  title: "Menü",
  description:
    "Burger Bár - Menü (A legfinomabb hamburgerek, amiket valaha kóstoltál.)",
});

const Page: NextPage = async () => {
  const data = await db.select().from(menu).execute();

  return (
    <main className="grid grid-cols-3 gap-4">
      {data.map((item) => (
        <div key={item.id} className="rounded bg-white p-4">
          <h2 className="text-xl font-bold">{item.name}</h2>
          <Image
            src={item.image ?? ""}
            alt={item.name ?? ""}
            width={200}
            height={200}
          />
          <p>{item.description}</p>
        </div>
      ))}
    </main>
  );
};

export default Page;
