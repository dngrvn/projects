import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

// const logDir = path.join("logs")
// if (!fs.existsSync(logDir)) {
//     fs.mkdirSync(logDir, { recursive: true })
// }

export const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: "YY-MM-DD HH:MM:SS" }),
        format.printf(({ level, message, timestamp }) => { return `[${level}] ${timestamp} ${message}` })
    ),
    transports: [
        new transports.Console({ format: format.colorize({ all: true })}),
        new transports.File({ filename: ("error.log"), level: "error" }),
        new transports.File({ filename: ("combine.log"), level: "debug" })
        // new transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
        // new transports.File({ filename: path.join(logDir, "combine.log"), level: "debug" })
    ]
})
