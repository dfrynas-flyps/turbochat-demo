import { TaskStatus, type Task } from "../types";
import React from "react";

export type TaskDetailsProps = {
	task: Task;
};

export const TaskDetails = ({
	task,
}: TaskDetailsProps) => {
	return (
		<div className="max-w-md mx-auto mt-8 bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5 font-sans">
			<h2 className="m-0 text-2xl font-bold text-gray-900">{task.title}</h2>
			{task.description && (
				<div className="text-gray-700 text-base leading-relaxed">
					{task.description}
				</div>
			)}
			<div className="flex gap-6 items-center flex-wrap">
				<span className="flex items-center gap-1.5 text-gray-500">
					<svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-label="Status">
						<title>Status</title>
						<circle
							cx="12"
							cy="12"
							r="10"
							stroke="#bdbdbd"
							strokeWidth="2"
							fill="#f6f8fa"
						/>
						<circle
							cx="12"
							cy="12"
							r="6"
							fill={
								task.status === TaskStatus.DONE
									? "#4ade80"
									: task.status === TaskStatus.IN_PROGRESS
										? "#facc15"
										: "#f87171"
							}
						/>
					</svg>
					<b className="font-semibold">Status:</b>{" "}
					{task.status
						.replace("_", " ")
						.replace(/\b\w/g, (c) => c.toUpperCase())}
				</span>
				{task.dueDate && (
					<span className="flex items-center gap-1.5 text-gray-500">
						<svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-label="Due date">
							<title>Due date</title>
							<rect
								x="3"
								y="4"
								width="18"
								height="16"
								rx="4"
								fill="#f6f8fa"
								stroke="#bdbdbd"
								strokeWidth="2"
							/>
							<path
								d="M8 2v4M16 2v4"
								stroke="#bdbdbd"
								strokeWidth="2"
								strokeLinecap="round"
							/>
							<rect x="7" y="10" width="10" height="2" rx="1" fill="#bdbdbd" />
						</svg>
						<b className="font-semibold">Due:</b>{" "}
						{new Date(task.dueDate).toLocaleDateString()}
					</span>
				)}
				<span className="flex items-center gap-1.5 text-gray-500">
					<svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-label="Created date">
						<title>Created date</title>
						<path
							d="M12 8v4l3 2"
							stroke="#bdbdbd"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<circle cx="12" cy="12" r="10" stroke="#bdbdbd" strokeWidth="2" />
					</svg>
					<b className="font-semibold">Created:</b>{" "}
					{new Date(task.createdAt).toLocaleDateString()}
				</span>
			</div>
		</div>
	);
};
