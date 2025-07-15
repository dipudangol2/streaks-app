import { NextFunction, Request, Response } from "express";
import { habitCheckinInput, HabitCreateInput, HabitUpdateInput } from "../interfaces/types";
import { fetchAllHabits, habitCreate } from "../models/habit.model";
import prisma from "../config/db";
import { Prisma } from "@prisma/client";



export const createHabit = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { title, description, frequency, startDate }: HabitCreateInput = request.body;
        const userId: string = (request as any).userId;

        const habit = await habitCreate({
            title,
            description,
            frequency,
            startDate,
            userId
        })
        response.status(201).json({
            success: true,
            data: habit
        });

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

export const updateHabit = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const habitId = request.params.id;
        const userId = (request as any).userId!;
        const incomingUpdates: HabitUpdateInput = request.body;

        const existingHabit = await prisma.habit.findUnique({
            where: {
                id: habitId,
                userId
            }
        });

        if (!existingHabit) {
            response.status(400).json({
                sucess: false,
                message: "Habit Not Found"
            });
            return;
        }
        const changes: HabitUpdateInput = {};
        for (const key in incomingUpdates) {
            const typedKey = key as keyof HabitUpdateInput;
            const value = incomingUpdates[typedKey];
            if (
                typedKey === "description" &&
                (value !== undefined && value !== existingHabit[typedKey])
            ) {
                changes[typedKey] = value as string | null;
            }
            else if (
                (typedKey === "title" || typedKey === "frequency") &&
                typeof value === "string" &&
                value !== existingHabit[typedKey]
            ) {
                changes[typedKey] = value;
            }
        }

        if (Object.keys(changes).length === 0) {
            response.status(200).json({
                message: "No changes detected",
                habit: existingHabit
            });
            return;
        }

        const updatedHabit = await prisma.habit.update({
            where: { id: habitId },
            data: {
                ...changes
            }
        });

        response.status(200).json(updatedHabit);


    } catch (error) {
        console.error("Error in updateHabit:", error);
        response.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}


export const deleteHabit = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const habitId = request.params.id;
        const userId: string = (request as any).userId;
        const habit = await prisma.habit.findUnique({
            where: { id: habitId }
        })
        if (!habit) {
            response.status(404).json({
                success: false,
                message: "Habit not found"
            })
            return;
        }
        if (habit.userId !== userId) {
            response.status(403).json({
                success: false,
                message: "Not authorized to delete this habit"
            })
            return;
        }
        await prisma.$transaction([
            prisma.habitCheckin.deleteMany({ where: { habitId } }),
            prisma.habit.delete({ where: { id: habitId } })
        ]);


        response.status(204).end();


    } catch (error) {
        console.error("Error in deleteHabit:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                response.status(404).json({
                    success: false,
                    message: "Habit not found"
                });
                return;
            }
        }

        response.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}

export const getHabit = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const habitId = request.params.id;
        const userId = (request as any).userId!;
        const habit = await prisma.habit.findUnique({
            where: {
                id: habitId,
                userId
            }
        });

        if (!habit) {
            response.status(400).json({
                sucess: false,
                message: "Habit Not Found"
            });
            return;
        }

        response.status(200).json({
            success: true,
            data: habit
        });


    } catch (error) {
        console.error("Error in updateHabit:", error);
        response.status(500).json({
            success: false,
            message: "Internal Server Error."
        })
    }
}

