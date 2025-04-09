import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { task as taskTable } from "./schema";
import { eq } from "drizzle-orm";
import type { Task } from "../types";

// Initialize the database client
const getDbClient = () => {
  // Use environment variable for database URL
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL environment variable is not defined");
  }

  const client = postgres(process.env.POSTGRES_URL);
  return drizzle(client);
};

// Export db instance with simplified type
export const db = getDbClient();

// Helper to convert null to undefined for Task interface compatibility
const convertDbTaskToTask = (dbTask: any): Task => {
  if (!dbTask) return dbTask;

  // Convert null values to undefined to match Task interface
  return {
    ...dbTask,
    description: dbTask.description ?? undefined,
    dueDate: dbTask.dueDate ?? undefined,
  };
};

// Database operations related to tasks
export const tasksDb = {
  // Create a new task
  async create(task: Task) {
    try {
      await db.insert(taskTable).values(task);
      return task;
    } catch (error) {
      console.error("Failed to create task in database", error);
      throw error;
    }
  },

  // Get a task by ID
  async getById(id: string) {
    try {
      const result = await db
        .select()
        .from(taskTable)
        .where(eq(taskTable.id, id));
      return result.length > 0 ? convertDbTaskToTask(result[0]) : undefined;
    } catch (error) {
      console.error("Failed to get task by ID from database", error);
      throw error;
    }
  },

  // Update a task
  async update(id: string, data: Partial<Task>) {
    try {
      await db.update(taskTable).set(data).where(eq(taskTable.id, id));
      // Fetch and return the updated task
      return this.getById(id);
    } catch (error) {
      console.error("Failed to update task in database", error);
      throw error;
    }
  },

  // Delete a task
  async delete(id: string) {
    try {
      const result = await db.delete(taskTable).where(eq(taskTable.id, id));
      // Return true if the operation was successful
      return true;
    } catch (error) {
      console.error("Failed to delete task from database", error);
      throw error;
    }
  },

  // List tasks with optional filters
  async list() {
    try {
      const result = await db.select().from(taskTable);
      // Convert all tasks to the proper Task interface
      return result.map(convertDbTaskToTask);
    } catch (error) {
      console.error("Failed to list tasks from database", error);
      throw error;
    }
  },

  // Create multiple tasks at once
  async createMany(tasks: Task[]) {
    try {
      if (tasks.length === 0) return [];
      
      await db.insert(taskTable).values(tasks);
      return tasks;
    } catch (error) {
      console.error("Failed to create multiple tasks in database", error);
      throw error;
    }
  },

  // Advanced filtering with Drizzle conditions
  async listWithFilters(sqlCondition: any) {
    try {
      const result = await db.select().from(taskTable).where(sqlCondition);
      return result.map(convertDbTaskToTask);
    } catch (error) {
      console.error("Failed to list tasks with filters from database", error);
      throw error;
    }
  },
};
