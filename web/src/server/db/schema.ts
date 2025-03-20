import {
  int,
  mysqlTableCreator,
  varchar,
  datetime,
} from "drizzle-orm/mysql-core";

export const createTable = mysqlTableCreator((name) => name);

export const tableReservations = createTable("table-reservation", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 256 }).notNull(),
  date: datetime("date").notNull(),
  people: int("people").notNull(),
  message: varchar("message", { length: 512 }),
});

export const menu = createTable("menu", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  price: int("price").notNull(),
  description: varchar("description", { length: 512 }).notNull(),
  image: varchar("image", { length: 256 }).notNull(),
});
