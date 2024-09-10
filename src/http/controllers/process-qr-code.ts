import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod";
import { makeProcessQRCodeUseCase } from '@/use-cases/factories/make-process-qr-code-use-case'

export async function processQRCode(request: FastifyRequest, reply: FastifyReply) {
  const processQRCodeBodySchema = z.object({
    qrCode: z.string().uuid(),
  });

  const { qrCode } = processQRCodeBodySchema.parse(request.body)

  try {
    const processQRCodeUseCase = makeProcessQRCodeUseCase();
    
    const result = await processQRCodeUseCase.execute({ 
      qrCode,
      userId: (request.user as { sub: string }).sub,
    })

    return reply.status(200).send(result);
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message });
    }
    return reply.status(500).send({ message: 'Internal server error' });
  }
}
