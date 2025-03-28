"use server";

import { formSchema, type FormSchema } from "~/lib/form-schema";
import { db } from "~/server/db";
import { tableReservations } from "~/server/db/schema";

export default async function saveTableReservation(formData: FormSchema) {
  const result = formSchema.safeParse(formData);

  if (!result.success) return { success: false };

  const localDate = new Date(result.data.date);
  const [hours, minutes] = result.data.time.split(":").map(Number);

  localDate.setHours(hours!, minutes);

  const utcDate = new Date(localDate.toISOString());

  const toInsert = {
    ...result.data,
    date: utcDate,
    people: Number(result.data.people),
  };

  try {
    await db.insert(tableReservations).values(toInsert).execute();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
