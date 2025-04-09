import TaskLoaderSkeleton from "./TaskLoaderSkeleton";
import TaskList from "./TaskList";

// Also re-export the prop types
export type { TaskLoaderSkeletonProps } from "./TaskLoaderSkeleton";
export type { TaskListProps } from "./TaskList";

// Export an object as the default export for easier consumption
const TasksComponents = {
  TaskLoaderSkeleton,
  TaskList,
};

export default TasksComponents;
