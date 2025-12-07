"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
	useChangeTaskStatus,
	useDeleteTask,
	useTaskFilters,
	useTasks,
} from "@/hooks/use-tasks";
import type { Task } from "@/types";
import { Container } from "../container";
import { EditTask } from "./edit-task";
import { TaskSidebar } from "./sidebar";
import { TaskFilter, TaskHeader, TaskList, TaskSearch } from "./task";

export function TaskView() {
	const {
		search,
		setSearch,
		status,
		setStatus,
		priority,
		setPriority,
		params,
	} = useTaskFilters();

	const { data: tasks = [], isLoading } = useTasks(params);

	const { mutate: deleteTask } = useDeleteTask();
	const { mutate: changeTaskStatus } = useChangeTaskStatus();

	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	const handleEdit = (id: string) => {
		const task = tasks.find((t) => t.id === id);
		if (task) {
			setEditingTask(task);
			setIsEditDialogOpen(true);
		}
	};

	const handleDelete = (id: string) => {
		const task = tasks.find((t) => t.id === id);
		const taskTitle = task?.title || "this task";

		toast.error(`Delete "${taskTitle}"?`, {
			description: "This action cannot be undone.",
			duration: 5000,
			action: {
				label: "Delete",
				onClick: () => deleteTask(id),
			},
			cancel: {
				label: "Cancel",
				onClick: () => {},
			},
		});
	};

	const handleStatusChange = (
		id: string,
		newStatus: "todo" | "in_progress" | "done",
	) => {
		changeTaskStatus({ id, status: newStatus });
	};

	const stats = {
		total: tasks.length,
		completed: tasks.filter((t) => t.status === "done").length,
		active: tasks.filter((t) => t.status === "in_progress").length,
		pending: tasks.filter(
			(t) => t.priority === "high" && t.status === "in_progress",
		).length,
	};

	return (
		<>
			<Container
				sidebar={<TaskSidebar stats={stats} />}
				header={<TaskHeader />}
				search={<TaskSearch search={search} setSearch={setSearch} />}
				filter={
					<TaskFilter
						statusFilter={status}
						setStatusFilter={setStatus}
						priorityFilter={priority}
						setPriorityFilter={setPriority}
					/>
				}
			>
				<TaskList
					tasks={tasks}
					isLoading={isLoading}
					onEdit={handleEdit}
					onDelete={handleDelete}
					onStatusChange={handleStatusChange}
				/>
			</Container>
			<EditTask
				task={editingTask}
				open={isEditDialogOpen}
				onOpenChange={setIsEditDialogOpen}
			/>
		</>
	);
}
