import { type NextRequest } from "next/server";
import { menu } from "~/server/db/schema";
import { getAllFromTable } from "~/app/api/get-all-from-table";
import { createNew } from "~/app/api/create-new";
import { z } from "zod";

const menuSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
});

export async function GET() {
  return getAllFromTable(menu);
}

export async function PUT(request: NextRequest) {
  return createNew(request, menu, menuSchema);
}
