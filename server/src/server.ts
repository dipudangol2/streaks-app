import express, { Application, Request, Response } from "express";
import pool from "./db/db";

const app: Application = express();


app.get("/", (request: Request, response: Response) => {
    response.send("Server is running");
});
app.get("/get-database-contents", async (request:Request, response:Response) => {
    const query = "SELECT * FROM users";
    try {
        const result =  await pool.query<any>(query);
        response.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
    }
})

export default app;