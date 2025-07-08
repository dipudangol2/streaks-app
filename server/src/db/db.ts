import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASSWORD),
    port: Number(process.env.DB_PORT)
});

async function verifyConnection(): Promise<void> {
    try {

        const client = await pool.connect();
        console.log("Connected to Postgres DB");
        client.release();

    } catch (error) {
        console.error("Error connecting to the database:" + error);
    }
}



verifyConnection();

export default pool;