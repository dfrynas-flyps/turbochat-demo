import { Hono } from "hono";
import { apiRouter } from "./router";

const app = new Hono();

app.route("/", apiRouter);

export default {
  fetch: app.fetch,
  port: process.env.PORT || 3001,
};
