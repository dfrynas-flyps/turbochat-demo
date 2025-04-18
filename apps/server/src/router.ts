import { Hono } from "hono";
import { cors } from "hono/cors";
import { tasksRouter } from "@turbochat/tasks/server";

export const apiRouter = new Hono();

apiRouter.use("/*", cors());

apiRouter.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Mount the tasks router
apiRouter.route("/tasks", tasksRouter);
