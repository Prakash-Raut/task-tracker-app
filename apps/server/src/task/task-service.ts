import { and, db, eq, ilike, or } from "@task-tracker-app/db";
import { task } from "@task-tracker-app/db/schema/task";
import type {
	CreateTaskInput,
	TaskFilter,
	UpdateTaskInput,
} from "./task-schema";
import type { Task } from "./task-type";

export class TaskService {
	constructor() {}

	public async create(input: CreateTaskInput, userId: string): Promise<string> {
		const [newTask] = await db
			.insert(task)
			.values({ ...input, userId })
			.returning();
		if (!newTask) {
			throw new Error("Failed to create task");
		}
		return newTask.id;
	}

	public async getAll(userId: string, filters?: TaskFilter): Promise<Task[]> {
		const conditions = [eq(task.userId, userId)];

		if (filters?.status) {
			conditions.push(eq(task.status, filters.status));
		}

		if (filters?.priority) {
			conditions.push(eq(task.priority, filters.priority));
		}

		if (filters?.search) {
			const searchTerm = `%${filters.search}%`;
			conditions.push(
				or(ilike(task.title, searchTerm), ilike(task.description, searchTerm))!,
			);
		}

		return db
			.select()
			.from(task)
			.where(and(...conditions));
	}

	public async getOne(id: string, userId: string): Promise<Task | null> {
		const [singleTask] = await db
			.select()
			.from(task)
			.where(and(eq(task.id, id), eq(task.userId, userId)));

		if (!singleTask) {
			throw new Error("Task not found");
		}

		return singleTask;
	}

	public async update(
		id: string,
		userId: string,
		input: UpdateTaskInput,
	): Promise<Task> {
		await this.getOne(id, userId);

		const [updatedTask] = await db
			.update(task)
			.set(input)
			.where(and(eq(task.id, id), eq(task.userId, userId)))
			.returning();

		if (!updatedTask) {
			throw new Error("Failed to update task");
		}

		return updatedTask;
	}

	public async delete(id: string, userId: string): Promise<string> {
		await this.getOne(id, userId);

		const [deletedTask] = await db
			.delete(task)
			.where(and(eq(task.id, id), eq(task.userId, userId)))
			.returning();

		if (!deletedTask) {
			throw new Error("Failed to delete task");
		}

		return deletedTask.id;
	}
}
