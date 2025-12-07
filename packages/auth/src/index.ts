import { db } from "@task-tracker-app/db";
import * as schema from "@task-tracker-app/db/schema/auth";
import { type Auth, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth: Auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	baseURL: process.env.BETTER_AUTH_URL || "",
	trustedOrigins: [process.env.CORS_ORIGIN || ""],
	emailAndPassword: {
		enabled: true,
	},
	advanced: {
		defaultCookieAttributes: {
			sameSite: "none",
			secure: true,
			httpOnly: true,
			path: "/",
		},
	},
});
