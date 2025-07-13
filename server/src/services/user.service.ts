import prisma from "../config/db";

export const getUsers = async () => {
  return await prisma.user.findMany({
    select: {  
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true
      
    },
    orderBy: {
      createdAt: 'desc' 
    }
  });
};