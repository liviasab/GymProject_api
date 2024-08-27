import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { processQRCode } from "./controllers/process-qr-code";

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/process-qr', processQRCode)
}