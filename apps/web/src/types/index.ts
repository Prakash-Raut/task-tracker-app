export type Task = {
	id: string;
	title: string;
	description: string | null;
	priority: "low" | "medium" | "high";
	dueDate: string | null;
	status: "todo" | "in_progress" | "done";
	userId: string;
	createdAt: string;
	updatedAt: string;
};

export type CreateTaskInput = {
	title: string;
	description?: string;
	priority: "low" | "medium" | "high";
	dueDate?: string;
};

export type UpdateTaskInput = {
	title?: string;
	description?: string;
	priority?: "low" | "medium" | "high";
	dueDate?: string;
	status?: "todo" | "in_progress" | "done";
};
