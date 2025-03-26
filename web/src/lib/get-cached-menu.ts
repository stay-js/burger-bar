import { unstable_cache } from "next/cache";
import { db } from "~/server/db";
import { menu } from "~/server/db/schema";

export const getCachedMenu = unstable_cache(
  () => db.select().from(menu).execute(),
  ["menu"],
  { revalidate: 60, tags: ["menu"] },
);
