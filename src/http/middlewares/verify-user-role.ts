import { FastifyReply, FastifyRequest } from "fastify"

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER' | 'GYM_OWNER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user as { role: string }

    if (role !== roleToVerify) {
      return reply.status(403).send({ message: 'Forbidden' })
    }
  }
}
