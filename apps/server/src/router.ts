import { Hono } from "hono";
import { cors } from "hono/cors";

export const apiRouter = new Hono();

apiRouter.use("/*", cors());

apiRouter.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

