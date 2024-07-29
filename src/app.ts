import fastify from "fastify";
import { PrismaClient } from '@prisma/client'



export const app = fastify()

const prisma = new PrismaClient()


prisma.users.create({

    data:{

        name: "Denilson",
        email: "denis@gmail.com",
        
    }


})

