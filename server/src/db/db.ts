import { Prisma, PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();


export const insertUser = async (user: Prisma.UserCreateInput) => {
    return await prisma.user.create({ data: user });
}

export const getUser = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
        omit: {
            password: true,
        }
    })
    
}


