import prisma from "../config/db";
import { HabitInput } from "../interfaces/types";

export const createHabit = async (data: HabitInput) => {
    const { user, userId, ...habitData } = data;
    return await prisma.habit.create({
        data: {
            ...habitData,
            user: { connect: { id: user.id } }
        }
    });
}
