import '@fastify/jwt'

declare module 'fastify' {
  export interface FastifyRequest {
    user: {
      sub: string;
      role: string;
    }
  }
}