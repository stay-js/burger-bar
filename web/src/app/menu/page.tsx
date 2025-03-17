import { type NextPage } from "next";
import Image from "next/image";
import { Title } from "~/components/title";
import { db } from "~/server/db";
import { menu } from "~/server/db/schema";
import { createMetadata } from "~/utils/create-metadata";

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

      <div className="grid w-4/5 grid-cols-1 gap-4 text-black md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg bg-orange-50"
          >
            <Image
              src={item.image ?? ""}
              alt={item.name ?? ""}
              width={600}
              height={400}
            />

            <div className="flex flex-col gap-2 p-4">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p>{item.description}</p>
              <p className="font-bold text-orange-600">{item.price} Ft</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;
