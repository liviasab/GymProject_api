import { registerUserCase } from '@/use-cases/register';
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod";


export async function register (request: FastifyRequest, reply: FastifyReply) {
  const registerSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
  });
  const { name, email, password } = registerSchema.parse(request.body)

  try {
    await registerUserCase ({
        name,
        email,
        password,
    })
  } catch (err) {
    return reply.status(489).send()
  }
  
  return reply.status(201).send();

}