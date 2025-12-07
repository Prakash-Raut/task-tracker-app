import { auth } from "@task-tracker-app/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, RequestHandler, Response } from "express";

export const requireAuth: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const session = await auth.api.getSession({
			headers: fromNodeHeaders(req.headers),
		});

		if (!session || !session.user) {
			return res.status(401).json({ error: "Not authenticated" });
		}

		req.session = session.session;
		req.user = session.user;
		next();
	} catch (err) {
		console.error("Auth error:", err);
		res.status(401).json({ error: "Bad Request" });
	}
};
