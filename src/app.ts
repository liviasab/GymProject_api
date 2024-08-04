import fastify from "fastify"
import { z } from 'zod'
import { prisma } from "./lib/prisma"

// import { stat } from "fs";

import bcrypt from 'bcrypt'

export const app = fastify()


app.post('/users', async (request, reply) => {
    const registerSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
    });
    const { name, email, password } = registerSchema.parse(request.body)

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: hashedPassword,
        }
    });
    return reply.status(201).send();

});
