import { tool } from "ai";
import { z } from "zod";
import type { Session } from "next-auth";

const taskDetails = ({ session }: { session: Session }) =>
	tool({
		description: "Get detailed information about particular task",
		parameters: z.object({
			id: z.string().min(1, "Task ID is required"),
		}),
		execute: async ({ id }) => {
			try {
				const response = await fetch(`${process.env.SERVER_URL}/tasks/${id}`);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						`Failed to get task details: ${JSON.stringify(errorData)}`,
					);
				}
				const result = await response.json();
				return result || null;
			} catch (error) {
				if (error instanceof Error) {
					throw new Error(`Error getting task details: ${error.message}`);
				}
				throw new Error("Unknown error occurred while getting task details");
			}
		},
	});

export default taskDetails;
