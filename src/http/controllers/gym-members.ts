import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from "zod";
import { makeRegisterToGymUseCase } from '@/use-cases/factories/make-register-to-gym-use-case';

export async function registerToGym(request: FastifyRequest, reply: FastifyReply) {
  const registerToGymParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const { gymId } = registerToGymParamsSchema.parse(request.params);

  try {
    const registerToGymUseCase = makeRegisterToGymUseCase();
    
    await registerToGymUseCase.execute({
      gymId,
      userId: (request.user as { sub: string }).sub,
    });

    return reply.status(201).send();
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal server error' });
  }
}