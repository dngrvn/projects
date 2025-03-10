import pg from "pg";
import dotenv from "dotenv";
import { logger } from "./_log.js";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

export const createUsersTable = async () => {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(30),
            lastname VARCHAR(30),
            email VARCHAR(30),
            phoneNumber VARCHAR(15)
        );
        `;
        await pool.query(query);
        logger.info("Table created or already exists");
    } catch (err) {
        logger.error("Table creation error:", err);
    }
};