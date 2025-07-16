import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { createHabit, deleteHabit, getAllHabits, getHabit, habitCheckin, updateHabit } from "../controllers/HabitController";


const habitRoutes: Router = Router();

habitRoutes.post("/create", verifyToken, createHabit);
habitRoutes.get("/", verifyToken, getAllHabits);
habitRoutes.put("/:id", verifyToken, updateHabit);
habitRoutes.delete("/remove/:id", verifyToken, deleteHabit);
habitRoutes.get("/:id", verifyToken, getHabit);
habitRoutes.post("/:id/checkin", verifyToken, habitCheckin);
export default habitRoutes;