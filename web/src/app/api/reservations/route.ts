import { type NextRequest } from "next/server";
import { z } from "zod";
import { tableReservations } from "~/server/db/schema";
import { deleteFromTable } from "../delete-from-table";
import { getAllFromTable } from "../get-all-from-table";
import { updatePartial } from "../updatePartial";
import { createNew } from "../create-new";

const reservationSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]{8,14}$/g),
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

export async function POST(request: NextRequest) {
  return createNew(request, tableReservations, reservationSchema);
}

export async function PATCH(request: NextRequest) {
  return updatePartial(
    request,
    tableReservations,
    reservationSchema.extend({ id: z.number() }),
  );
}

export async function DELETE(request: NextRequest) {
  return deleteFromTable(request, tableReservations);
}
