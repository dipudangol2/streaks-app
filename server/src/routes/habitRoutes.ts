import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { CreateHabit } from "../controllers/HabitController";


const habitRoutes: Router = Router();

habitRoutes.post("/create", verifyToken, CreateHabit);

export default habitRoutes;