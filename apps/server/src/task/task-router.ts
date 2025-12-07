import { logger } from "@task-tracker-app/logger";
import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { TaskController } from "./task-controller";
import { TaskService } from "./task-service";
import type { AuthRequest } from "./task-type";

const taskRouter: Router = Router();

const taskService = new TaskService();
const taskController = new TaskController(taskService, logger);

taskRouter.post("/", (req: Request, res: Response, next: NextFunction) =>
	taskController.create(req as AuthRequest, res, next),
);
taskRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
	taskController.getAll(req as AuthRequest, res, next),
);
taskRouter.get("/:id", (req: Request, res: Response, next: NextFunction) =>
	taskController.getOne(req as AuthRequest, res, next),
);
taskRouter.put("/:id", (req: Request, res: Response, next: NextFunction) =>
	taskController.update(req as AuthRequest, res, next),
);
taskRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) =>
	taskController.delete(req as AuthRequest, res, next),
);
taskRouter.patch(
	"/:id/status",
	(req: Request, res: Response, next: NextFunction) =>
		taskController.changeStatus(req as AuthRequest, res, next),
);

export { taskRouter };
