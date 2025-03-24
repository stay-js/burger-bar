import { type NextRequest } from "next/server";
import { z } from "zod";
import { tableReservations } from "~/server/db/schema";
import { getAllFromTable } from "../get-all-from-table";
import { updatePartial } from "../updatePartial";

const reservationSchema = z.object({
  id: z.number(),
  date: z.date(),
  people: z.number(),
});

export async function GET() {
  return getAllFromTable(tableReservations);
}

export async function PATCH(request: NextRequest) {
  return updatePartial(request, tableReservations, reservationSchema);
}
