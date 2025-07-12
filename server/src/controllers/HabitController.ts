import { NextFunction, Request, Response } from "express";
import { HabitInput } from "../interfaces/types";
import { createHabit } from "../models/habit.model";



export const CreateHabit = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { title, description, frequency, startDate }: HabitInput = request.body;
        const userId: string = (request as any).userId;

        const habit = await createHabit({
            title,
            description,
            frequency,
            startDate,
            userId
        })
        console.log(habit);
        response.status(201).json(habit);

    } catch (error) {
        console.error(error)
        response.status(500).send("Internal Server Error");
        return;

    }


}