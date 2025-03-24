import { type NextRequest } from "next/server";
import { z } from "zod";
import { tableReservations } from "~/server/db/schema";
import { deleteFromTable } from "../delete-from-table";
import { getAllFromTable } from "../get-all-from-table";
import { updatePartial } from "../updatePartial";

const reservationSchema = z.object({
  id: z.number(),
  date: z.coerce
    .date()
    .transform(
      (date) =>
        new Date(
          Date.UTC(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
          ),
        ),
    ),
  people: z.number(),
});

export async function GET() {
  return getAllFromTable(tableReservations);
}

export async function PATCH(request: NextRequest) {
  return updatePartial(request, tableReservations, reservationSchema);
}

export async function DELETE(request: NextRequest) {
  return deleteFromTable(request, tableReservations);
}
