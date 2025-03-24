import { type NextRequest } from "next/server";
import { z } from "zod";
import { menu } from "~/server/db/schema";
import { getAllFromTable } from "../get-all-from-table";
import { createNew } from "../create-new";
import { updatePartial } from "../updatePartial";

const menuSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
});

export async function GET() {
  return getAllFromTable(menu);
}

export async function POST(request: NextRequest) {
  return createNew(request, menu, menuSchema);
}

export async function PATCH(request: NextRequest) {
  return updatePartial(request, menu, menuSchema.extend({ id: z.number() }));
}
