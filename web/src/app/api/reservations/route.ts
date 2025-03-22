import { tableReservations } from "~/server/db/schema";
import { getAllFromTable } from "~/app/api/get-all-from-table";

export async function GET() {
  return getAllFromTable(tableReservations);
}
