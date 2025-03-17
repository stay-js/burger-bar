"use server";

import { formSchema, type FormSchema } from "~/lib/form-schema";
import { db } from "~/server/db";
import { tableReservations } from "~/server/db/schema";

export default async function saveTableReservation(formData: FormSchema) {
  const data = formSchema.safeParse(formData);

  if (!data.success) return { success: false };

  const toInsert = {
    ...data.data,
    date: new Date(data.data.date),
    people: Number(data.data.people),
  };

  try {
    await db.insert(tableReservations).values(toInsert).execute();
    return { success: true };
  } catch {
    return { success: false };
  }
}
