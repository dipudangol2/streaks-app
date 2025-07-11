import { NextFunction, Request, Response } from "express";
import { HabitInput } from "../interfaces/types";



export const createHabit = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { title, description, frequency, startDate }: HabitInput = request.body;

    } catch (error) {
        console.error(error)
        response.status(500).send("Internal Server Error");
        return;

    }


}