import React from "react";
import { type Task, TaskStatus } from "../types";
import { TaskList } from "../components/TaskList";

export const tasksArtifactConfig = {
	kind: "tasks",
	description: "Manage and organize your tasks",
	onStreamPart: ({
		streamPart,
		setArtifact,
	}: { streamPart: { type: string; tasks: Task[] }; setArtifact: (draft: unknown) => void }) => {
		if (streamPart.type === "tasks-delta") {
			setArtifact((draftArtifact: Record<string, unknown>) => ({
				...draftArtifact,
				content: JSON.stringify(streamPart.tasks),
				isVisible: true,
				status: "streaming",
			}));
		}
	},

	content: ({ content }: { content: string }) => {
		// Parse the content string to get tasks
		let tasks: Task[] = [];
		try {
			tasks = JSON.parse(content || "[]");
		} catch (e) {
			console.error("Failed to parse tasks:", e);
		}

		return (
			<div className="w-full p-4 bg-red-500">
				<TaskList tasks={tasks} />
			</div>
		);
	},

	actions: [
		{
			icon: <div>refresh</div>,
			description: "Refresh tasks",
			onClick: async ({ setArtifact }: { setArtifact: (callback: (draft: Record<string, unknown>) => Record<string, unknown>) => void }) => {
				// Implement refresh logic by fetching tasks from API
				const response = await fetch("/api/tasks");
				const tasks = await response.json();

				setArtifact((draft) => ({
					...draft,
					content: JSON.stringify(tasks),
				}));
			},
		},
		{
			icon: <div>add</div>,
			description: "Add new task",
			onClick: ({
				content,
				onSaveContent,
			}: {
				content: string;
				onSaveContent: (content: string, shouldSave: boolean) => void;
			}) => {
				// Implement add task logic
				// This could open a modal or prompt for task details
				const taskTitle = prompt("Enter task title:");
				if (taskTitle) {
					// Parse current tasks
					let tasks: Task[] = [];
					try {
						tasks = JSON.parse(content || "[]");
					} catch (e) {
						console.error("Failed to parse tasks:", e);
					}

					// Create a temporary task (will be replaced by server response)
					const newTask: Task = {
						id: `temp-${Date.now()}`,
						title: taskTitle,
						status: TaskStatus.TODO,
						userId: "current-user", // Will be replaced by server
						createdAt: new Date(),
					};

					// Update the content with the new task
					onSaveContent(JSON.stringify([...tasks, newTask]), false);

					// Make API call to create the task
					fetch("/api/tasks", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ title: taskTitle }),
					});
				}
			},
		},
	],

	toolbar: [],
};
