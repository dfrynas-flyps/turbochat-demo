import { tool } from "ai";
import { z } from "zod";
import { Session } from "next-auth";

const listTasks = ({ session }: { session: Session }) =>
    tool({
      description: "List all tasks. Whenever user asks for tasks list you should pick this tool and fetch existing tasks in system.",
      parameters: z.object({}),
      execute: async () => {
        try {
          const response = await fetch(`${process.env.SERVER_URL}/tasks`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to list tasks: ${JSON.stringify(errorData)}`);
          }
          const result = await response.json();
          return result?.tasks || [];
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error listing tasks: ${error.message}`);
          }
          throw new Error("Unknown error occurred while listing tasks");
        }
      },
    });

export default listTasks;