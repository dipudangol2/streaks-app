import { NextFunction, Request, Response } from "express";
import { getUsers } from "../services/user.service";
import { count } from "console";


export const getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await getUsers();
        response.status(200).json({ success: true, data: users, count: users.length });
    } catch (error) {
        console.error("Get Users failed:", error);
        response.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}