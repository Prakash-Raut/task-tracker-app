import { auth } from "@task-tracker-app/auth";
import { logger } from "@task-tracker-app/logger";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import "dotenv/config";
import express, { type Express } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { requireAuth } from "./middlewares/requireAuth";
import { taskRouter } from "./task/task-router";

const app: Express = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "",
		methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/", (_req, res) => {
	res.status(200).send("OK");
});

app.use(requireAuth);

app.use("/api/v1/tasks", taskRouter);

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	logger.info({
		message: `API is Live ${port}`,
		port,
	});
});

export default app;