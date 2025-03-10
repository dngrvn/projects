import express from "express";
import dotenv from "dotenv"
import { logger } from "./_log.js";
import { createUsersTable, pool } from "./_dbConfig.js";
import { router } from "./_usersRoute.js";

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000

//Middleware
app.use(express.json())
app.use(router)

async function start() {
    try {
        
        const res = await pool.query("SELECT NOW()")
        logger.info("Connection to the database is established, " )


        app.listen(PORT, () => {
            logger.info(`The server is running on port: ${PORT}`)
        })
    } catch (err) {
        logger.error("Error during server start: ", err)
    }
}
createUsersTable()
start()

