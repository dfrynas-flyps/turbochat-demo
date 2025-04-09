import React from "react";
import { Task, TaskStatus } from "../types";

export interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }: TaskListProps) => {
  // Function to get appropriate status badge color
  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case TaskStatus.TODO:
        return "bg-gray-200 text-gray-800";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-200 text-blue-800";
      case TaskStatus.DONE:
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // Format date to a readable string
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {tasks.length === 0 ? (
        <div className="text-gray-500 text-center">No tasks found</div>
      ) : (
        tasks.map((task: Task) => (
          <div
            key={task.id}
            className="border border-gray-200 shadow rounded-md p-4 w-full"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{task.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                {task.status.replace("_", " ")}
              </span>
            </div>
            
            {task.description && (
              <p className="text-gray-600 text-sm mb-2">{task.description}</p>
            )}
            
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Created: {formatDate(task.createdAt)}</span>
              {task.dueDate && (
                <span>Due: {formatDate(task.dueDate)}</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
