import { NextFunction, Request, Response } from "express";
import prisma from "../config/db";

export const isAdmin = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = (request as any).userId

        if (!userId) {
            response.status(401).json({
                success: false,
                message: "User is not authenticated",
            });
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                isAdmin: true,
            }
        });

        if (!user?.isAdmin) {
            response.status(403).json({
                success: false,
                message: "Admin privileges required"
            });
            return;
        }
        next();

    } catch (error) {
        console.error("Admin check failed: ", error);
        response.status(500).json({ success: false, message: "Internal Server Error" });

    }
}