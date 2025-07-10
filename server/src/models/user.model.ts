import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const createUser = async (data: {
    email: string,
    password: string,
}) => {
    return await prisma.user.create({ data });
}

export const getUserByEmail = async (email: string) => {

    return prisma.user.findUnique({
        where: { email },
    })

}