"use server";

import { formSchema, type FormSchema } from "~/lib/form-schema";
import { db } from "~/server/db";
import { tableReservations } from "~/server/db/schema";

export default async function saveTableReservation(formData: FormSchema) {
  const result = formSchema.safeParse(formData);

  if (!result.success) return { success: false };

  const year = result.data.date.getFullYear();
  const month = result.data.date.getMonth();
  const day = result.data.date.getDate();
  const [hours, minutes] = result.data.time.split(":").map(Number);

  const toInsert = {
    ...result.data,
    date: new Date(Date.UTC(year, month, day, hours, minutes)),
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
