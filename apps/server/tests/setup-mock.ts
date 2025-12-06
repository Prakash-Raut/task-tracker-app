import { mock } from "bun:test";
import type { NextFunction, Request, Response } from "express";

mock.module("@/middlewares/requireAuth", () => ({
	requireAuth: (req: Request, _res: Response, next: NextFunction) => {
		req.user = {
			id: "LWat6JtmvAleTJ9lGckngj4Xjg3bKj9J",
			email: "prakaAshraut2537@gmail.com",
			emailVerified: true,
			name: "Prakash Raut",
			image:
				"https://lh3.googleusercontent.com/a/ACg8ocJ8H1tYxAylFatSoKiSpH_IIpk99Hcztqndp9cqOoQNcQ87VMrm=s96-c",
			createdAt: new Date("2025-12-05 05:21:20.395"),
			updatedAt: new Date("2025-12-05 05:21:20.395"),
		};
		next();
	},
}));
