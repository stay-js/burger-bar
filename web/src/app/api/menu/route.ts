import { type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { menu } from "~/server/db/schema";
import { createNew } from "../create-new";
import { deleteFromTable } from "../delete-from-table";
import { getAllFromTable } from "../get-all-from-table";
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
  const response = createNew(request, menu, menuSchema);
  revalidateTag("menu");
  return response;
}

export async function PATCH(request: NextRequest) {
  const response = updatePartial(
    request,
    menu,
    menuSchema.extend({ id: z.number() }),
  );
  revalidateTag("menu");
  return response;
}

export async function DELETE(request: NextRequest) {
  const response = deleteFromTable(request, menu);
  revalidateTag("menu");
  return response;
}
