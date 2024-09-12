import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from "zod";
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case';
import { makeReadGymUseCase } from '@/use-cases/factories/make-read-gym-use-case';
import { makeUpdateGymUseCase } from '@/use-cases/factories/make-update-gym-use-case';
import { makeDeleteGymUseCase } from '@/use-cases/factories/make-delete-gym-use-case';
import { makeFetchUserGymsUseCase } from '@/use-cases/factories/make-fetch-user-gyms-use-case';
import { makeListOrSearchGymsUseCase } from '@/use-cases/factories/make-list-or-search-gyms-use-case';
import { makeGetUserMembershipsUseCase } from '@/use-cases/factories/make-get-user-memberships-use-case';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => Math.abs(value) <= 90),
    longitude: z.number().refine(value => Math.abs(value) <= 180),
  });

  const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body);

  try {
    const createGymUseCase = makeCreateGymUseCase();
    
    const { gym } = await createGymUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
      ownerId: (request.user as { sub: string }).sub,
    });

    return reply.status(201).send({ gym });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal server error' });
  }
}

export async function read(request: FastifyRequest, reply: FastifyReply) {
  const readGymParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = readGymParamsSchema.parse(request.params);

  try {
    const readGymUseCase = makeReadGymUseCase();
    
    const { gym } = await readGymUseCase.execute({ id });

    return reply.status(200).send({ gym });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(404).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal server error' });
  }
}

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateGymParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const updateGymBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    latitude: z.number().refine(value => Math.abs(value) <= 90).optional(),
    longitude: z.number().refine(value => Math.abs(value) <= 180).optional(),
  });

  const { id } = updateGymParamsSchema.parse(request.params);
  const data = updateGymBodySchema.parse(request.body);

  try {
    const updateGymUseCase = makeUpdateGymUseCase();
    
    const { gym } = await updateGymUseCase.execute({
      id,
      data,
      userId: (request.user as { sub: string }).sub,
    });

    return reply.status(200).send({ gym });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal server error' });
  }
}

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteGymParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = deleteGymParamsSchema.parse(request.params);

  try {
    const deleteGymUseCase = makeDeleteGymUseCase();
    
    await deleteGymUseCase.execute({
      id,
      userId: (request.user as { sub: string }).sub,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal server error' });
  }
}

export async function fetchUserGyms(request: FastifyRequest, reply: FastifyReply) {
  const fetchUserGymsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = fetchUserGymsQuerySchema.parse(request.query);

  try {
    const fetchUserGymsUseCase = makeFetchUserGymsUseCase();
    
    const { gyms } = await fetchUserGymsUseCase.execute({
      userId: (request.user as { sub: string }).sub,
      page,
    });

    return reply.status(200).send({ gyms });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ message: 'Internal server error' });
  }
}

export async function listOrSearchGyms(request: FastifyRequest, reply: FastifyReply) {
  const listOrSearchGymsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    per_page: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
  });

  const { page, per_page, search } = listOrSearchGymsQuerySchema.parse(request.query);

  try {
    const listOrSearchGymsUseCase = makeListOrSearchGymsUseCase();
    
    const { gyms, total, total_pages } = await listOrSearchGymsUseCase.execute({
      page,
      per_page,
      search,
    });

    return reply.status(200).send({ 
      gyms, 
      total, 
      page, 
      per_page, 
      total_pages 
    });
  } catch (err) {
    console.error('Error in listOrSearchGyms:', err);
    if (err instanceof Error) {
      return reply.status(500).send({ message: `Internal server error: ${err.message}` });
    }
    return reply.status(500).send({ message: 'Internal server error' });
  }
}

export async function getUserMemberships(request: FastifyRequest, reply: FastifyReply) {
  const getUserMembershipsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    per_page: z.coerce.number().min(1).max(100).default(20),
  });

  const { page, per_page } = getUserMembershipsQuerySchema.parse(request.query);

  try {
    const getUserMembershipsUseCase = makeGetUserMembershipsUseCase();
    
    const { memberships, total, total_pages } = await getUserMembershipsUseCase.execute({
      userId: (request.user as { sub: string }).sub,
      page,
      per_page,
    });

    return reply.status(200).send({ 
      memberships, 
      total, 
      page, 
      per_page, 
      total_pages 
    });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ message: 'Internal server error' });
  }
}