import { TaskManager } from "../taskManager";
import { type Task, type TaskCreateInput, TaskStatus } from "../types";
import type { DataStreamWriter } from "ai";
import type { Session } from "next-auth";

const taskManager = new TaskManager();

type CreateDocumentCallbackProps = {
	title: string;
	dataStream: DataStreamWriter;
	session: Session;
};

export interface UpdateDocumentCallbackProps {
	description: string;
	dataStream: DataStreamWriter;
	session: Session;
}

export interface TasksStreamData {
	type: "tasks-delta";
	tasks: Task[];
}

export const createTasksDocumentHandler = () => ({
	kind: "tasks" as const,
	onCreateDocument: async ({
		title,
		dataStream,
		session,
	}: CreateDocumentCallbackProps) => {
		if (!session.user || !session.user.id) {
			throw new Error("User not authenticated");
		}
		// Parse the title to extract task information or use it as a task title
		const taskInput: TaskCreateInput = {
			title,
			status: TaskStatus.TODO,
			userId: session.user.id,
		};

		// Create the task
		const task = await taskManager.createTask(taskInput);

		// Get all tasks for the user to display
		const userTasks = await taskManager.listTasks({ userId: session.user.id });

		// Stream the tasks to the client
		dataStream.writeData({
			type: "tasks-delta",
			tasks: JSON.stringify(userTasks),
		});

		// Return serialized tasks as content
		return JSON.stringify(userTasks);
	},

	onUpdateDocument: async ({
		description,
		dataStream,
		session,
	}: UpdateDocumentCallbackProps) => {
		if (!session.user || !session.user.id) {
			throw new Error("User not authenticated");
		}
		// Parse the description to extract task updates or create new tasks
		// This could involve NLP to extract task information from text
		const taskInput: TaskCreateInput = {
			title: description,
			status: TaskStatus.TODO,
			userId: session.user.id,
		};

		// Create a new task based on the update
		await taskManager.createTask(taskInput);

		// Get all tasks for the user
		const userTasks = await taskManager.listTasks({ userId: session.user.id });

		// Stream the updated tasks to the client
		dataStream.writeData({
			type: "tasks-delta",
			tasks: JSON.stringify(userTasks),
		});

		// Return serialized tasks as content
		return JSON.stringify(userTasks);
	},
});
