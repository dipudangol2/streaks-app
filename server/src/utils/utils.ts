import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 12;
const MAX_AGE = 3 * 24 * 60 * 60 * 1000;


export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export const comparePasswords = async (plain: string, hashed: string): Promise<Boolean> => {
    return await bcrypt.compare(plain, hashed);
}

export const createToken = (email: string, userId: string, isAdmin: boolean) => {
    const jwtKey = process.env.JWT_KEY;
    if (!jwtKey) {
        throw new Error("JWT_KEY is not defined in environment variables");
    }
    return jwt.sign({ email, userId, isAdmin }, jwtKey, {
        expiresIn: MAX_AGE,
    });
}
export const isNextDay = (prevDate: Date, currentDate: Date) => {
    const prev = new Date(prevDate);
    prev.setDate(prev.getDate() + 1);

    return (
        prev.getDate() === currentDate.getDate() &&
        prev.getMonth() === currentDate.getMonth() &&
        prev.getFullYear() === currentDate.getFullYear()
    );
}