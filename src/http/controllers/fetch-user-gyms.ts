import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from "zod";
import { makeFetchUserGymsUseCase } from '@/use-cases/factories/make-fetch-user-gyms-use-case';

// Add this interface to define the structure of the user object
interface AuthenticatedRequest extends FastifyRequest {
  user: { sub: string };
}

export async function fetchUserGyms(request: AuthenticatedRequest, reply: FastifyReply) {
  const fetchUserGymsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = fetchUserGymsQuerySchema.parse(request.query);

  try {
    const fetchUserGymsUseCase = makeFetchUserGymsUseCase();
    
    const { gyms } = await fetchUserGymsUseCase.execute({
      userId: request.user.sub,
      page,
    });

    return reply.status(200).send({ gyms });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ message: 'Internal server error' });
  }
}