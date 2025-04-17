import { TaskTools } from "@turbochat/tasks/types";

export const Tools = {
  getWeather: "getWeather",
  createDocument: "createDocument",
  updateDocument: "updateDocument",
  requestSuggestions: "requestSuggestions",
  ...TaskTools
} as const;

export type Tools = (typeof Tools)[keyof typeof Tools];