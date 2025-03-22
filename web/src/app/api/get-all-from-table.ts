import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { type MySqlTable } from "drizzle-orm/mysql-core";

export async function getAllFromTable<T extends MySqlTable>(table: T) {
  try {
    const data = await db.select().from(table).execute();
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);

    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}
