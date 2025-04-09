import { pgTable, varchar, timestamp, uuid, text } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }),
});

export const task = pgTable("Task", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  status: varchar("status", { enum: ["todo", "in_progress", "done"] })
    .notNull()
    .default("todo"),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt").notNull(),
  dueDate: timestamp("dueDate"),
});

export type DBTask = InferSelectModel<typeof task>;
