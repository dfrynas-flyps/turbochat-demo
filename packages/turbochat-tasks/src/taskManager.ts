import { randomUUID } from "crypto";
import {
  Task,
  TaskStatus,
  TaskFilter,
  TaskCreateInput,
  TaskUpdateInput,
} from "./types";
import { tasksDb } from "./db/client";
import { and, eq, inArray, or, lt, gt, SQL } from "drizzle-orm";
import { task } from "./db/schema";

/**
 * TaskManager class for managing tasks in the TurboChat application
 */
export class TaskManager {
  /**
   * Create a new task
   */
  async createTask(input: TaskCreateInput): Promise<Task> {
    const id = randomUUID();
    const now = new Date();

    const newTask: Task = {
      id,
      title: input.title,
      description: input.description,
      status: input.status || TaskStatus.TODO,
      userId: input.userId,
      createdAt: now,
      dueDate: input.dueDate,
    };

    await tasksDb.create(newTask);
    return newTask;
  }

  /**
   * Get a task by ID
   */
  async getTask(id: string): Promise<Task | undefined> {
    return await tasksDb.getById(id);
  }

  /**
   * Update an existing task
   */
  async updateTask(
    id: string,
    input: TaskUpdateInput
  ): Promise<Task | undefined> {
    const task = await this.getTask(id);

    if (!task) {
      return undefined;
    }

    const updatedTask: Partial<Task> = {
      ...input,
    };

    return await tasksDb.update(id, updatedTask);
  }

  /**
   * Delete a task by ID
   */
  async deleteTask(id: string): Promise<boolean> {
    return await tasksDb.delete(id);
  }

  /**
   * List all tasks, optionally filtered
   */
  async listTasks(filter?: TaskFilter): Promise<Task[]> {
    if (!filter) {
      return await tasksDb.list();
    }

    // Convert the filter to Drizzle conditions if possible
    const dbCondition = this.createDbCondition(filter);
    if (dbCondition) {
      return await tasksDb.listWithFilters(dbCondition);
    }

    // Fall back to in-memory filtering for complex conditions
    const allTasks = await tasksDb.list();
    return this.filterTasks(allTasks, filter);
  }

  /**
   * Create multiple tasks at once
   */
  async createMultipleTasks(inputs: TaskCreateInput[]): Promise<Task[]> {
    if (!inputs.length) {
      return [];
    }
    
    const tasks: Task[] = [];
    
    for (const input of inputs) {
      const id = randomUUID();
      const now = new Date();
      
      const newTask: Task = {
        id,
        title: input.title,
        description: input.description,
        status: input.status || TaskStatus.TODO,
        userId: input.userId,
        createdAt: now,
        dueDate: input.dueDate,
      };
      
      tasks.push(newTask);
    }
    
    // Bulk create all tasks at once
    await tasksDb.createMany(tasks);
    return tasks;
  }

  /**
   * Create a database condition from a TaskFilter when possible
   */
  private createDbCondition(filter: TaskFilter): SQL<unknown> | null {
    const conditions: SQL<unknown>[] = [];

    // Status filter
    if (filter.status) {
      if (Array.isArray(filter.status)) {
        conditions.push(inArray(task.status, filter.status));
      } else {
        conditions.push(eq(task.status, filter.status));
      }
    }

    // User ID filter
    if (filter.userId) {
      conditions.push(eq(task.userId, filter.userId));
    }

    // Due date filters
    if (filter.dueBefore) {
      conditions.push(lt(task.dueDate, filter.dueBefore));
    }

    if (filter.dueAfter) {
      conditions.push(gt(task.dueDate, filter.dueAfter));
    }

    // If no conditions, return null
    if (conditions.length === 0) {
      return null;
    }

    // Using a more type-safe approach to avoid undefined issues
    if (conditions.length === 1) {
      return conditions[0];
    }

    // Combine all conditions with AND
    let result: SQL<unknown> | undefined = conditions[0];
    for (let i = 1; i < conditions.length; i++) {
      result = and(result, conditions[i]);
    }
    return result ?? null;
  }

  /**
   * Apply filters to a list of tasks
   */
  private filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
    return tasks.filter((task) => {
      // Filter by status
      if (filter.status) {
        const statuses = Array.isArray(filter.status)
          ? filter.status
          : [filter.status];
        if (!statuses.includes(task.status)) {
          return false;
        }
      }

      // Filter by userId
      if (filter.userId && task.userId !== filter.userId) {
        return false;
      }

      // Filter by due date before
      if (filter.dueBefore && task.dueDate && task.dueDate > filter.dueBefore) {
        return false;
      }

      // Filter by due date after
      if (filter.dueAfter && task.dueDate && task.dueDate < filter.dueAfter) {
        return false;
      }

      return true;
    });
  }
}
