import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { processQRCode } from "./controllers/process-qr-code";
import { create, read, update, remove, fetchUserGyms } from "./controllers/gyms";
import { verifyJWT } from "./middlewares/verify-jwt";
import { verifyUserRole } from "./middlewares/verify-user-role";
import { addTurnstile, getTurnstileQRCode, getTurnstileCheckIns, listGymTurnstiles } from "./controllers/turnstiles";
import { registerToGym } from "./controllers/gym-members";
import { deleteTurnstile } from "./controllers/turnstiles";

export async function appRoutes(app: FastifyInstance) {
  app.post('/signup', register);
  app.post('/login', authenticate);
  
  // Authenticated routes
  app.post('/process-qr', { onRequest: [verifyJWT] }, processQRCode);
  
  // Gym CRUD routes
  app.post('/gyms', { onRequest: [verifyJWT, verifyUserRole('GYM_OWNER')] }, create);
  app.get('/gyms/:id', { onRequest: [verifyJWT] }, read);
  app.put('/gyms/:id', { onRequest: [verifyJWT, verifyUserRole('GYM_OWNER')] }, update);
  app.delete('/gyms/:id', { onRequest: [verifyJWT, verifyUserRole('GYM_OWNER')] }, remove);
  app.get('/user/gyms', { onRequest: [verifyJWT, verifyUserRole('GYM_OWNER')] }, fetchUserGyms);

  // New routes for gym owners
  app.post('/gyms/:gymId/turnstiles', { onRequest: [verifyJWT, verifyUserRole('GYM_OWNER')] }, addTurnstile);
  app.get('/turnstiles/:id/qrcode', { onRequest: [verifyJWT, verifyUserRole('GYM_OWNER')] }, getTurnstileQRCode);
  app.get('/turnstiles/:id/check-ins', { onRequest: [verifyJWT, verifyUserRole('GYM_OWNER')] }, getTurnstileCheckIns);

  // New route for gym members
  app.post('/gyms/:id/register', { onRequest: [verifyJWT] }, registerToGym);

  // New route to list gym turnstiles
  app.get('/gyms/:gymId/turnstiles', { onRequest: [verifyJWT, verifyUserRole('GYM_OWNER')] }, listGymTurnstiles);

  // Nova rota para deletar uma catraca
  app.delete('/turnstiles/:id', { onRequest: [verifyJWT, verifyUserRole('GYM_OWNER')] }, deleteTurnstile);
}
