import { Hono } from "hono";
import { TaskManager } from "../taskManager";
import {
	type TaskCreateInput,
	type TaskUpdateInput,
	type TaskFilter,
	TaskStatus,
} from "../types";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// Initialize task manager
const taskManager = new TaskManager();

const tasksRouter = new Hono();

// Schema for task creation validation
const createTaskSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	status: z
		.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
		.optional(),
	userId: z.string().min(1, "User ID is required"),
	dueDate: z.string().datetime().optional(),
});

// Schema for task update validation
const updateTaskSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	status: z
		.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
		.optional(),
	dueDate: z.string().datetime().optional(),
});

// Schema for bulk task creation validation
const createMultipleTasksSchema = z
	.array(
		z.object({
			title: z.string().min(1, "Title is required"),
			description: z.string().optional(),
			status: z
				.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
				.optional(),
			userId: z.string().min(1, "User ID is required"),
			dueDate: z.string().datetime().optional(),
		}),
	)
	.min(1, "At least one task is required");

// Schema for filter query parameters
const filterQuerySchema = z.object({
	status: z
		.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
		.or(z.array(z.string()))
		.optional(),
	userId: z.string().optional(),
	dueBefore: z.string().datetime().optional(),
	dueAfter: z.string().datetime().optional(),
});

// Get all tasks with optional filtering
tasksRouter.get("/", zValidator("query", filterQuerySchema), async (c) => {
	try {
		const queryParams = c.req.query();

		const filter: TaskFilter = {};

		if (queryParams.status) {
			filter.status = queryParams.status.includes(",")
				? (queryParams.status.split(",") as TaskStatus[])
				: (queryParams.status as TaskStatus);
		}

		if (queryParams.userId) {
			filter.userId = queryParams.userId;
		}

		if (queryParams.dueBefore) {
			filter.dueBefore = new Date(queryParams.dueBefore);
		}

		if (queryParams.dueAfter) {
			filter.dueAfter = new Date(queryParams.dueAfter);
		}

		const tasks = await taskManager.listTasks(
			Object.keys(filter).length > 0 ? filter : undefined,
		);

		return c.json({
			tasks,
			count: tasks.length,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		return c.json({ error: "Failed to retrieve tasks" }, 500);
	}
});

// Get a task by ID
tasksRouter.get("/:id", async (c) => {
	const id = c.req.param("id");

	try {
		const task = await taskManager.getTask(id);

		if (!task) {
			return c.json({ error: "Task not found" }, 404);
		}

		return c.json(task);
	} catch (error) {
		return c.json({ error: "Failed to retrieve task" }, 500);
	}
});

// Create a new task
tasksRouter.post("/", zValidator("json", createTaskSchema), async (c) => {
	try {
		const input = await c.req.json<TaskCreateInput>();

		// Convert string date to Date object if provided
		if (input.dueDate && typeof input.dueDate === "string") {
			input.dueDate = new Date(input.dueDate);
		}

		const task = await taskManager.createTask(input);

		return c.json(task, 201);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return c.json({ error: "Validation error", details: error.errors }, 400);
		}

		return c.json({ error: "Failed to create task" }, 500);
	}
});

// Update a task
tasksRouter.put("/:id", zValidator("json", updateTaskSchema), async (c) => {
	const id = c.req.param("id");

	try {
		const input = await c.req.json<TaskUpdateInput>();

		// Convert string date to Date object if provided
		if (input.dueDate && typeof input.dueDate === "string") {
			input.dueDate = new Date(input.dueDate);
		}

		const updatedTask = await taskManager.updateTask(id, input);

		if (!updatedTask) {
			return c.json({ error: "Task not found" }, 404);
		}

		return c.json(updatedTask);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return c.json({ error: "Validation error", details: error.errors }, 400);
		}

		return c.json({ error: "Failed to update task" }, 500);
	}
});

// Delete a task
tasksRouter.delete("/:id", async (c) => {
	const id = c.req.param("id");

	try {
		const deleted = await taskManager.deleteTask(id);

		if (!deleted) {
			return c.json({ error: "Task not found" }, 404);
		}

		return c.json({ success: true, message: "Task deleted successfully" });
	} catch (error) {
		return c.json({ error: "Failed to delete task" }, 500);
	}
});

// Create multiple tasks at once
tasksRouter.post(
	"/bulk",
	zValidator("json", createMultipleTasksSchema),
	async (c) => {
		try {
			const inputs = await c.req.json<TaskCreateInput[]>();

			// Convert string dates to Date objects if provided
			for (const input of inputs) {
				if (input.dueDate && typeof input.dueDate === "string") {
					input.dueDate = new Date(input.dueDate);
				}
			}

			const tasks = await taskManager.createMultipleTasks(inputs);

			return c.json(
				{
					success: true,
					count: tasks.length,
					tasks,
				},
				201,
			);
		} catch (error) {
			if (error instanceof z.ZodError) {
				return c.json(
					{ error: "Validation error", details: error.errors },
					400,
				);
			}

			return c.json({ error: "Failed to create tasks" }, 500);
		}
	},
);

export default tasksRouter;
