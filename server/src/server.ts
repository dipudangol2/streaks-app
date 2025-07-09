import express, { Application } from "express";

import cors from "cors";


const app: Application = express();
app.use(
    cors({
        origin: ["*"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);
app.use(express.json());



export default app;