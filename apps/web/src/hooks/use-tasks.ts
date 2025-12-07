"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { taskApi } from "@/lib/api";
import type { CreateTaskInput, UpdateTaskInput } from "@/types";

export const useTasks = (params: Record<string, any>) =>
	useQuery({
		queryKey: ["tasks", params],
		queryFn: () => taskApi.getTasks(params).then((res) => res.data),
	});

export type TaskStatusFilter = "all" | "todo" | "in_progress" | "done";
export type TaskPriorityFilter = "all" | "low" | "medium" | "high";

export const useTaskFilters = () => {
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState<TaskStatusFilter>("all");
	const [priority, setPriority] = useState<TaskPriorityFilter>("all");

	const [debouncedSearch, setDebouncedSearch] = useState("");

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedSearch(search);
		}, 400);

		return () => clearTimeout(timeout);
	}, [search]);

	// Build params object, excluding undefined values
	const params: Record<string, string> = {};

	if (status !== "all") {
		params.status = status;
	}

	if (priority !== "all") {
		params.priority = priority;
	}

	if (debouncedSearch && debouncedSearch.trim()) {
		params.search = debouncedSearch.trim();
	}

	return {
		search,
		setSearch,
		status,
		setStatus,
		priority,
		setPriority,
		params,
	};
};

// hook to create a task
export const useCreateTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateTaskInput) => taskApi.createTask(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});
};

// hook to delete a task
export const useDeleteTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => taskApi.deleteTask(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});
};

// hook to update a task
export const useUpdateTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateTaskInput }) =>
			taskApi.updateTask(id, data),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			queryClient.invalidateQueries({ queryKey: ["task", id] });
		},
	});
};

// hook to change task status
export const useChangeTaskStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			status,
		}: {
			id: string;
			status: "todo" | "in_progress" | "done";
		}) => taskApi.changeTaskStatus(id, status),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
			queryClient.invalidateQueries({ queryKey: ["task", id] });
		},
	});
};
