"use client";

import { useState } from "react";
import { useDeleteTask, useTaskFilters, useTasks } from "@/hooks/use-tasks";
import type { Task } from "@/types";
import { Container } from "../container";
import { EditTask } from "./edit-task";
import { TaskSidebar } from "./sidebar";
import { TaskFilter, TaskHeader, TaskList, TaskSearch } from "./task";

export function TaskH() {
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

	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	const handleEdit = (id: string) => {
		const task = tasks.find((t) => t.id === id);
		if (task) {
			setEditingTask(task);
			setIsEditDialogOpen(true);
		}
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
					onDelete={deleteTask}
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
