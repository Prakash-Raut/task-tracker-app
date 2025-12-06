import winston, { type Logger } from "winston";

export const logger: Logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [new winston.transports.Console()],
});

export type { Logger };
