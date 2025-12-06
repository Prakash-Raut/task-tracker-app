import axios from "axios";
import type { CreateTaskInput, Task, UpdateTaskInput } from "@/types";

export const api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`,
	withCredentials: true,
});

export const taskApi = {
	getTasks: (params?: Record<string, any>) =>
		api.get<Task[]>("/tasks", { params }),

	getTask: (id: string) => api.get<Task>(`/tasks/${id}`),

	createTask: (task: CreateTaskInput) => api.post<Task>("/tasks", task),

	updateTask: (id: string, task: UpdateTaskInput) =>
		api.put<Task>(`/tasks/${id}`, task),

	deleteTask: (id: string) => api.delete(`/tasks/${id}`),
};
