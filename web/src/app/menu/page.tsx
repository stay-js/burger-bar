import { db } from "~/server/db";
import { menu } from "~/server/db/schema";
import Image from "next/image";

export default async function MenuPage() {
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
}
