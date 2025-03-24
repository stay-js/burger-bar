import { db } from "~/server/db";
import { type NextRequest, NextResponse } from "next/server";
import { type MySqlTable } from "drizzle-orm/mysql-core";
import type { ZodObject, ZodRawShape, z } from "zod";
import {
  type Column,
  type ColumnBaseConfig,
  type ColumnDataType,
  eq,
} from "drizzle-orm";

export async function updatePartial<
  T extends MySqlTable & {
    id: Column<ColumnBaseConfig<ColumnDataType, string>, object, object>;
  },
  U extends ZodObject<ZodRawShape & { id: z.ZodNumber }>,
>(request: NextRequest, table: T, validator: U) {
  const json = (await request.json()) as unknown;
  const result = validator.safeParse(json);

  if (!result.success) {
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }

  const data = result.data as { id: number };

  try {
    await db.update(table).set(data).where(eq(table.id, data.id)).execute();
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}
