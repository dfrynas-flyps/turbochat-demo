import React from "react";

export interface TaskLoaderSkeletonProps {
	count?: number;
	message?: string;
}

const buildLoaderArray = (count: number) => Array.from({ length: count }).map((_, index) => index);
export const TaskLoaderSkeleton = ({
	count = 1,
	message = "Generating tasks...",
}) => {
	return (
		<div className="flex flex-col w-full space-y-4 gap-4">
			<div className="flex mb-3">
				<p className="text-gray-700 font-medium">{message}</p>
			</div>
			{buildLoaderArray(count).map((item) => (
				<div
					key={item}
					className="border border-gray-200 shadow rounded-md w-full"
				>
					<div className="animate-pulse flex space-x-4">
						<div className="rounded-full bg-gray-200 h-10 w-10" />
						<div className="flex-1 space-y-3 py-1">
							<div className="h-4 bg-gray-200 rounded w-3/4" />
							<div className="space-y-2">
								<div className="h-3 bg-gray-200 rounded" />
								<div className="h-3 bg-gray-200 rounded w-5/6" />
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default TaskLoaderSkeleton;
