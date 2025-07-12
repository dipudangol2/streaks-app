import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes";
import cookieParser from "cookie-parser";
import habitRoutes from "./routes/habitRoutes";


const app: Application = express();
app.use(
    cors({
        origin: ["*"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes)




export default app;