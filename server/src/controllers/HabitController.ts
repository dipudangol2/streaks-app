import { NextFunction, Request, Response } from "express";
import { HabitInput } from "../interfaces/types";
import { fetchAllHabits, habitCreate } from "../models/habit.model";



export const createHabit = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { title, description, frequency, startDate }: HabitInput = request.body;
        const userId: string = (request as any).userId;

        const habit = await habitCreate({
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
        response.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
        return;

    }


}

export const getAllHabits = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId: string = (request as any).userId;
        const userHabits = await fetchAllHabits(userId);
        console.log(userHabits);
        response.status(200).json({
            success: true,
            data: userHabits
        });

    } catch (error) {
        console.error(error);
        response.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}