import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetRemainingCheckInsUseCase } from '@/use-cases/factories/make-get-remaining-check-ins-use-case'

export async function getRemainingCheckIns(request: FastifyRequest, reply: FastifyReply) {
  const getRemainingCheckInsUseCase = makeGetRemainingCheckInsUseCase()

  const { remainingCheckIns } = await getRemainingCheckInsUseCase.execute({
    userId: request.user.sub,
    date: new Date(),
  })

  return reply.status(200).send({
    remainingCheckIns,
  })
}