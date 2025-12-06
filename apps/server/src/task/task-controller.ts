import type { Logger } from "@task-tracker-app/logger";
import type { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import {
	createTaskSchema,
	taskFilterSchema,
	updateTaskSchema,
} from "./task-schema";
import type { TaskService } from "./task-service";
import type { AuthRequest } from "./task-type";

export class TaskController {
	constructor(
		private readonly taskService: TaskService,
		private readonly logger: Logger,
	) {}

	create = async (req: AuthRequest, res: Response, next: NextFunction) => {
		const validatedData = createTaskSchema.safeParse(req.body);

		if (!validatedData.success) {
			return next(createHttpError(400, validatedData.error.message));
		}

		const { title, description, dueDate, priority } = validatedData.data;

		const newTask = await this.taskService.create(
			{
				title,
				description,
				dueDate,
				priority,
			},
			req.user.id,
		);

		if (!newTask) {
			return next(createHttpError(400, "Failed to create task"));
		}

		this.logger.info({
			message: "Task created",
			task: newTask,
		});

		res.status(201).json(newTask);
	};

	getAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
		const { data: filters, error } = taskFilterSchema.safeParse(req.query);

		if (error) {
			return next(createHttpError(400, "Invalid query params"));
		}

		const tasks = await this.taskService.getAll(req.user.id, filters);

		this.logger.info({
			message: "Tasks fetched",
			count: tasks.length,
		});

		res.status(200).json(tasks);
	};

	getOne = async (req: AuthRequest, res: Response, next: NextFunction) => {
		const { id } = req.params;

		if (!id) {
			return next(createHttpError(400, "Task ID is required"));
		}

		const task = await this.taskService.getOne(id, req.user.id);

		if (!task) {
			return next(createHttpError(404, "Task not found"));
		}

		this.logger.info({
			message: "Task fetched",
			task,
		});

		res.status(200).json(task);
	};

	update = async (req: AuthRequest, res: Response, next: NextFunction) => {
		const { id } = req.params;

		if (!id) {
			return next(createHttpError(400, "Task ID is required"));
		}

		const validatedData = updateTaskSchema.safeParse(req.body);

		if (!validatedData.success) {
			return next(createHttpError(400, validatedData.error.message));
		}

		const data = Object.fromEntries(
			Object.entries(validatedData.data).filter(([, v]) => v !== undefined),
		);

		if (Object.keys(data).length === 0) {
			return next(createHttpError(400, "No fields to update"));
		}

		const updatedTask = await this.taskService.update(id, req.user.id, data);

		if (!updatedTask) {
			return next(createHttpError(400, "Failed to update task"));
		}

		this.logger.info({
			message: "Task updated",
			task: updatedTask.id,
		});

		res.status(200).json(updatedTask);
	};

	delete = async (req: AuthRequest, res: Response, next: NextFunction) => {
		const { id } = req.params;

		if (!id) {
			return next(createHttpError(400, "Task ID is required"));
		}

		const deletedTask = await this.taskService.delete(id, req.user.id);

		if (!deletedTask) {
			return next(createHttpError(400, "Failed to delete task"));
		}

		this.logger.info({
			message: "Task deleted",
			task: deletedTask,
		});

		res.status(200).json(deletedTask);
	};
}
