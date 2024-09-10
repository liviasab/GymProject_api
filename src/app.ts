import fastify from "fastify";
import { appRoutes } from "./http/routes";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { ZodError } from "zod";
import { env } from './env'

const app = fastify();

// Configuração do CORS
app.register(cors, {
  origin: true, // Permitir todas as origens (ou especificar a origem correta)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
});

// Configuração do JWT
app.register(jwt, {
  secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({massage: 'Validation error.', issues: error.format()})
  }
if (env.NODE_ENV != 'production' ) {
  console.error (error)
} else {
// TODO: Here we should log to on external tool like Data/NewRelic/Sentry
}



  return reply.status(500).send({ message: 'Internal server error.'})
})

app.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});

export { app };
