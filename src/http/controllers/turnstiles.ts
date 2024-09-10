import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from "zod";
import { makeAddTurnstileUseCase } from '@/use-cases/factories/make-add-turnstile-use-case';
import { makeGetTurnstileQRCodeUseCase } from '@/use-cases/factories/make-get-turnstile-qr-code-use-case';
import { makeGetTurnstileCheckInsUseCase } from '@/use-cases/factories/make-get-turnstile-check-ins-use-case';
import { makeListGymTurnstilesUseCase } from '@/use-cases/factories/make-list-gym-turnstiles-use-case';
import { makeDeleteTurnstileUseCase } from '@/use-cases/factories/make-delete-turnstile-use-case';

export async function addTurnstile(request: FastifyRequest, reply: FastifyReply) {
  const addTurnstileParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const { gymId } = addTurnstileParamsSchema.parse(request.params);

  try {
    console.log('Attempting to add turnstile for gym:', gymId);
    const addTurnstileUseCase = makeAddTurnstileUseCase();
    
    const { turnstile } = await addTurnstileUseCase.execute({
      gymId,
      ownerId: (request.user as { sub: string }).sub,
    });

    console.log('Turnstile added successfully:', turnstile);
    return reply.status(201).send({ turnstile });
  } catch (err) {
    console.error('Error adding turnstile:', err);
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal server error' });
  }
}

export async function getTurnstileQRCode(request: FastifyRequest, reply: FastifyReply) {
  const getTurnstileQRCodeParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = getTurnstileQRCodeParamsSchema.parse(request.params);

  try {
    const getTurnstileQRCodeUseCase = makeGetTurnstileQRCodeUseCase();
    
    const { qrCode } = await getTurnstileQRCodeUseCase.execute({
      turnstileId: id,
      ownerId: (request.user as { sub: string }).sub,
    });

    return reply.status(200).send({ qrCode });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal server error' });
  }
}

export async function getTurnstileCheckIns(request: FastifyRequest, reply: FastifyReply) {
  const getTurnstileCheckInsParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const getTurnstileCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { id } = getTurnstileCheckInsParamsSchema.parse(request.params);
  const { page } = getTurnstileCheckInsQuerySchema.parse(request.query);

  try {
    const getTurnstileCheckInsUseCase = makeGetTurnstileCheckInsUseCase();
    
    const { checkIns } = await getTurnstileCheckInsUseCase.execute({
      turnstileId: id,
      ownerId: (request.user as { sub: string }).sub,
      page,
    });

    return reply.status(200).send({ checkIns });
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal server error' });
  }
}

export async function listGymTurnstiles(request: FastifyRequest, reply: FastifyReply) {
  const listGymTurnstilesParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const { gymId } = listGymTurnstilesParamsSchema.parse(request.params);

  try {
    const listGymTurnstilesUseCase = makeListGymTurnstilesUseCase();
    
    const { turnstiles } = await listGymTurnstilesUseCase.execute({
      gymId,
      ownerId: (request.user as { sub: string }).sub,
    });

    return reply.status(200).send({ turnstiles });
  } catch (err) {
    console.error('Error listing gym turnstiles:', err);
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal server error' });
  }
}

export async function deleteTurnstile(request: FastifyRequest, reply: FastifyReply) {
  const deleteTurnstileParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = deleteTurnstileParamsSchema.parse(request.params);

  try {
    const deleteTurnstileUseCase = makeDeleteTurnstileUseCase();
    
    await deleteTurnstileUseCase.execute({
      turnstileId: id,
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
