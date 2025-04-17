import { pgTable, varchar, timestamp, uuid, text } from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";
import { TaskStatus } from "../types";

export const user = pgTable("User", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	email: varchar("email", { length: 64 }).notNull(),
	password: varchar("password", { length: 64 }),
});

export const task = pgTable("Task", {
	id: uuid("id").primaryKey().notNull().defaultRandom(),
	title: text("title").notNull(),
	description: text("description"),
	status: varchar("status", { enum: [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE] })
		.notNull()
		.default(TaskStatus.TODO),
	userId: uuid("userId")
		.notNull()
		.references(() => user.id),
	createdAt: timestamp("createdAt").notNull(),
	dueDate: timestamp("dueDate"),
});

export type DBTask = InferSelectModel<typeof task>;
