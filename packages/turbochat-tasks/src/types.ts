/**
 * Type definitions for turbochat-tasks
 */

export interface Task {
	id: string;
	title: string;
	description?: string;
	status: TaskStatus;
	userId: string;
	createdAt: Date;
	dueDate?: Date;
}

export enum TaskStatus {
	TODO = "todo",
	IN_PROGRESS = "in_progress",
	DONE = "done",
}

export interface TaskFilter {
	status?: TaskStatus | TaskStatus[];
	userId?: string;
	dueBefore?: Date;
	dueAfter?: Date;
}

export interface TaskCreateInput {
	title: string;
	description?: string;
	status?: TaskStatus;
	userId: string;
	dueDate?: Date;
}

export interface TaskUpdateInput {
	title?: string;
	description?: string;
	status?: TaskStatus;
	dueDate?: Date;
}

export const TaskTools = {
	createTasks: "createTasks",
	updateTasks: "updateTasks",
	listTasks: "listTasks",
	updateTask: "updateTask",
	taskDetails: "taskDetails",
} as const;
