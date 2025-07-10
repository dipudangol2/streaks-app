import { NextFunction, Request, Response } from "express";
import app from "./server";
import { Prisma } from "./generated/prisma";
import bcrypt from "bcrypt";
import { insertUser, getUser } from "./db/db";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

app.listen(port, () => {

    console.log(`Server is running on port ${port}`);
})