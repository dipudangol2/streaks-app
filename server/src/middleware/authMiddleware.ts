import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
    try {
        const jwtKey = process.env.JWT_KEY;
        if (!jwtKey) throw new Error("Jwt is not set");
        const token = request.cookies.jwt;
        if (!token) {
            response.status(401).json({ message: "User is not Authenticated." });
            return;
        }
        jwt.verify(token, jwtKey, async (error: jwt.VerifyErrors | null, payload: unknown) => {
            if (error) {
                response.status(403).json({ message: "Invalid Token" });
                return;
            }
            if (typeof payload === "object" && payload !== null && "userId" in payload) {
                request.userId = (payload as { userId: string }).userId;
                return next();
            }
            response.status(403).json({ message: "Malformed token payload" });
        })

    }
    catch (error) {
        console.error("Authentication error", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
}