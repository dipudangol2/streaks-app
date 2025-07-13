import { NextFunction, Request, Response } from "express";
import { createUser, getUserByEmail } from "../models/user.model";
import { comparePasswords, createToken, hashPassword } from "../utils/utils";
const MAX_AGE = 3 * 24 * 60 * 60 * 1000;


export const signup = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            response.status(400).json({
                success: false,
                message: "Email and password is required!",
            });
            return;
        }
        const hash = await hashPassword(password);
        const user = await createUser({ email, password: hash })
        console.log(user);


        response.status(201).json({
            success: true,
            data: {
                userId: user.id,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error)
        response.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }


}
export const login = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            response.status(400).json({
                success: false,
                message: "Email and password is required!"
            });
            return;
        }
        const user = await getUserByEmail(email);
        if (user === null) {
            response.status(404).json({
                success: false,
                message: "User not found!"
            });
            return;
        }
        console.log(user);
        const auth = await comparePasswords(password, user.password);
        console.log(auth);
        if (!auth) {
            response.status(400).json({
                success: true,
                message: "Passwords do not match"
            });
            return;
        }

        response.cookie("jwt", createToken(email, user.id), {
            maxAge: MAX_AGE,
            secure: true,
            sameSite: "none"
        })

        response.status(200).json({
            user: {
                userId: user.id,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error)
        response.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
}

