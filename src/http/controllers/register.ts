import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt  from "bcrypt";

export async function register (request: FastifyRequest, reply: FastifyReply) {
  const registerSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
  });
  const { name, email, password } = registerSchema.parse(request.body)

  const saltRounds = 6;
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
        email,
    },
  })

  if (userWithSameEmail) {
    return reply.status(489).send()
  }

  await prisma.user.create({
      data: {
          name,
          email,
          password_hash: hashedPassword,
      }
  });
  return reply.status(201).send();

};