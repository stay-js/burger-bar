import {
  int,
  mysqlTableCreator,
  timestamp,
  varchar,
  date,
} from "drizzle-orm/mysql-core";

export const createTable = mysqlTableCreator((name) => name);

export const tableReservations = createTable("table-reservation", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  date: date("date"),
  time: timestamp("time"),
  people: int("people"),
});

export const menu = createTable("menu", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }),
  price: int("price"),
  description: varchar("description", { length: 512 }),
  image: varchar("image", { length: 256 }),
});
