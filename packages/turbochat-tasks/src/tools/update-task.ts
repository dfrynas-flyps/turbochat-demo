import { tool } from "ai";
import { z } from "zod";
import { Session } from "next-auth";
import { Tasks, TaskStatus } from "../client";

const updateTask = ({ session }: { session: Session }) => tool({
    description: 'Whenever user asks for updating particular task, you should use this tool and send whole task including updated data',
    parameters: z.object({
        id: z.string().min(1, "Task ID is required"),
        title: z.string().optional(),
        description: z.string().optional(),
        status: z
            .enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
            .optional(),
        dueDate: z.string().datetime().optional(),
    }),
    execute: async ({ id, title, description, status, dueDate }) => {
        try {
            const response = await fetch(`${process.env.SERVER_URL}/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                    dueDate,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to update task: ${JSON.stringify(errorData)}`);
            }
            const result = await response.json();
            return result?.task || null;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error updating task: ${error.message}`);
            }
            throw new Error("Unknown error occurred while updating task");
        }
    },
})

export default updateTask;
