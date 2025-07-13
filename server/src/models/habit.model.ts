import prisma from "../config/db";
import { HabitInput } from "../interfaces/types";

export const habitCreate = async (data: HabitInput) => {
    return await prisma.habit.create({ data })
}

export const fetchAllHabits = async (userId: string) => {
    return await prisma.habit.findMany({
        where: { userId: userId }
    })
}