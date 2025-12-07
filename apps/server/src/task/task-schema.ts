import z from "zod";

export const createTaskSchema = z.object({
	title: z.string().trim().min(1).max(32),
	description: z.string().optional(),
	dueDate: z.coerce.date().optional(),
	priority: z.enum(["low", "medium", "high"]),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
	title: z.string().trim().min(1).max(32).optional(),
	description: z.string().optional(),
	dueDate: z.coerce.date().optional(),
	priority: z.enum(["low", "medium", "high"]).optional(),
	status: z.enum(["todo", "in_progress", "done"]).optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

export const taskFilterSchema = z.object({
	status: z.enum(["todo", "in_progress", "done"]).optional(),
	priority: z.enum(["low", "medium", "high"]).optional(),
	search: z.string().optional(),
});

export type TaskFilter = z.infer<typeof taskFilterSchema>;

export const changeStatusSchema = z.object({
	status: z.enum(["todo", "in_progress", "done"]),
});

export type ChangeStatusInput = z.infer<typeof changeStatusSchema>;
