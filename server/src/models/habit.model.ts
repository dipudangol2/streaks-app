import prisma from "../config/db";
import { HabitInput } from "../interfaces/types";

export const createHabit = async (data: HabitInput) => {
    return await prisma.habit.create({ data })
}
