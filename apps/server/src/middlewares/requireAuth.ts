import { auth } from "@task-tracker-app/auth";
import { logger } from "@task-tracker-app/logger";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, RequestHandler, Response } from "express";

export const requireAuth: RequestHandler = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Direct console output for debugging
		console.log("=== AUTH CHECK ===");
		console.log("Cookies:", req.headers.cookie);
		console.log("Origin:", req.headers.origin);

		const session = await auth.api.getSession({
			headers: fromNodeHeaders(req.headers),
		});

		console.log("Session result:", {
			hasSession: !!session,
			hasUser: !!session?.user,
			sessionId: session?.session?.id,
		});

		if (!session || !session.user) {
			console.log("❌ No session found - returning 401");
			return res.status(401).json({ error: "Not authenticated" });
		}

		console.log("✅ Session valid, proceeding");
		req.session = session.session;
		req.user = session.user;
		next();
	} catch (err) {
		console.error("Auth error:", err);
		logger.error({
			message: "Auth check error",
			error: err,
		});
		res.status(401).json({ error: "Bad Request" });
	}
};
