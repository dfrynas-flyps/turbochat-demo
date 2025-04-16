import { tool } from "ai";
import { z } from "zod";
import { TaskStatus } from "../types";
import { Session } from "next-auth";

interface CreateTasksProps {
  session: Session;
}

const createTasks = ({ session }: CreateTasksProps) =>
  tool({
    description: "Create or generate multiple tasks in bulk",
    parameters: z.object({
      tasks: z
        .array(
          z.object({
            title: z.string().min(1, "Title is required"),
            description: z.string().optional(),
            status: z
              .enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
              .optional(),
            dueDate: z.string().datetime().optional(),
          })
        )
        .min(1, "At least one task is required"),
    }),
    execute: async ({ tasks }) => {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/tasks/bulk`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            tasks.map((task) => ({
              ...task,
              userId: session.user?.id,
            }))
          ),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to create tasks: ${JSON.stringify(errorData)}`
          );
        }

        const result = await response.json();
        return result?.tasks || [];
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error creating tasks: ${error.message}`);
        }
        throw new Error("Unknown error occurred while creating tasks");
      }
    },
  });

export default createTasks;
