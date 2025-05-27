import { type NextRequest } from "next/server";
import { z } from "zod";
import { reservations } from "~/server/db/schema";
import { deleteFromTable } from "../delete-from-table";
import { getAllFromTable } from "../get-all-from-table";
import { updatePartial } from "../updatePartial";
import { createNew } from "../create-new";

const reservationSchema = z.object({
  userId: z.string(),
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
  return getAllFromTable(reservations);
}

export async function POST(request: NextRequest) {
  return createNew(request, reservations, reservationSchema);
}

export async function PATCH(request: NextRequest) {
  return updatePartial(
    request,
    reservations,
    reservationSchema.extend({ id: z.number() }),
  );
}

export async function DELETE(request: NextRequest) {
  return deleteFromTable(request, reservations);
}
