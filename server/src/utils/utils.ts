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

export const createToken = (email: string, userId: string) => {
    const jwtKey = process.env.JWT_KEY;
    if (!jwtKey) {
        throw new Error("JWT_KEY is not defined in environment variables");
    }
    return jwt.sign({ email, userId }, jwtKey, {
        expiresIn: MAX_AGE,
    });
}