import { logger } from "@task-tracker-app/logger";
import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
import { v4 as uuidv4 } from "uuid";

const isProduction = process.env.NODE_ENV === "production";

export const globalErrorHandler: ErrorRequestHandler = (
	err: any,
	req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const errorId = uuidv4();
	const statusCode = err.statusCode || err.status || 500;
	const message = isProduction ? "Internal Server Error" : err.message;
	const zodError = err.errors || null;

	logger.error({
		id: errorId,
		message: err.message,
		statusCode,
		error: err.stack,
		path: req.path,
		method: req.method,
	});

	res.status(statusCode).json({
		errors: [
			{
				ref: errorId,
				type: err.name,
				msg: message,
				feild: zodError,
				path: req.path,
				method: req.method,
				location: "server",
				stack: isProduction ? null : err.stack,
			},
		],
	});
};
