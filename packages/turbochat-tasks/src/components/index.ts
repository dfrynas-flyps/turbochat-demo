import TaskLoaderSkeleton from "./TaskLoaderSkeleton";
import TaskList from "./TaskList";
import { TaskDetails } from "./Task";

// Also re-export the prop types
export type { TaskLoaderSkeletonProps } from "./TaskLoaderSkeleton";
export type { TaskListProps } from "./TaskList";
export type { TaskDetailsProps } from "./Task";

// Export an object as the default export for easier consumption
const TasksComponents = {
	TaskLoaderSkeleton,
	TaskList,
	TaskDetails,
};

export default TasksComponents;
