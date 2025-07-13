import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/AdminMiddleware";
import { getAllUsers } from "../controllers/AdminController";


const adminRoutes: Router = Router();


adminRoutes.get("/get-all-users", verifyToken, isAdmin, getAllUsers);

export default adminRoutes;