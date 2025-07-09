import { NextFunction, Request, Response } from "express";
import app from "./server";
import { Prisma } from "./generated/prisma";
import bcrypt from "bcrypt";
import { insertUser, getUser } from "./db/db";



app.get("/", (request: Request, response: Response, next: NextFunction) => {
    response.status(200).send("request successful");
})
app.post("/insert-user", async (request: Request, response: Response, next: NextFunction) => {

    try {
        const { email, password, name } = request.body;
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user: Prisma.UserCreateInput = {
            email: email,
            password: hashedPassword,
            name: name
        }
        const insertedUser = await insertUser(user);

        response.status(201).json({ insertedUser });

    } catch (error) {
        console.error(error);
    }
});
app.get("/get-user/:email", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email } = request.params;
        console.log(email);
        const returnedUser = await getUser(email);
        console.log(returnedUser);
        response.status(200).json({ returnedUser });

    } catch (error) {
        console.error(error);
    }
})



app.listen(8000, () => {

    console.log(`Server is running on port 8000`);
})