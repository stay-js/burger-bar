import { db } from "~/server/db";
import { type NextRequest, NextResponse } from "next/server";
import { type MySqlTable } from "drizzle-orm/mysql-core";
import { type ZodSchema } from "zod";

export async function createNew<T extends MySqlTable, U extends ZodSchema>(
  request: NextRequest,
  table: T,
  validator: U,
) {
  const json = (await request.json()) as unknown;
  const result = validator.safeParse(json);

  if (!result.success) {
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }

  const data = result.data as U;

  try {
    await db.insert(table).values(data).execute();
    return new NextResponse(JSON.stringify(data), { status: 201 });
  } catch (error) {
    console.error(error);

    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}
