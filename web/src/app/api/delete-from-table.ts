import { db } from "~/server/db";
import { type NextRequest, NextResponse } from "next/server";
import { type MySqlTable } from "drizzle-orm/mysql-core";
import {
  type Column,
  type ColumnBaseConfig,
  type ColumnDataType,
  eq,
} from "drizzle-orm";
import { z } from "zod";

export async function deleteFromTable<
  T extends MySqlTable & {
    id: Column<ColumnBaseConfig<ColumnDataType, string>, object, object>;
  },
>(request: NextRequest, table: T) {
  const json = (await request.json()) as unknown;
  const result = z.object({ id: z.number() }).safeParse(json);

  if (!result.success) {
    return new NextResponse(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
    });
  }

  try {
    await db.delete(table).where(eq(table.id, result.data.id)).execute();
    return new NextResponse(JSON.stringify({ message: "Deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}
