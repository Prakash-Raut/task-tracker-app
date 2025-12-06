import type { Session, User } from "better-auth";
import type { Request } from "express";

export interface AuthRequest extends Request {
	user: User;
	session: Session;
}

export type Task = {
	id: string;
	title: string;
	description: string | null;
	priority: "low" | "medium" | "high";
	dueDate: Date | null;
	status: "todo" | "in_progress" | "done";
	userId: string;
	createdAt: Date;
	updatedAt: Date;
};
