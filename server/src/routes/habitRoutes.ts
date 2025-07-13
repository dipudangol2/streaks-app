import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { createHabit, getAllHabits } from "../controllers/HabitController";


const habitRoutes: Router = Router();

habitRoutes.post("/create", verifyToken, createHabit);
habitRoutes.get("/get-all", verifyToken, getAllHabits);

export default habitRoutes;