
export const Tools = {
  getWeather: "getWeather",
  createDocument: "createDocument",
  updateDocument: "updateDocument",
  requestSuggestions: "requestSuggestions",
} as const;

export type Tools = (typeof Tools)[keyof typeof Tools];