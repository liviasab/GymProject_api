import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { processQRCode } from "./controllers/process-qr-code";
import { create, read, update, remove, fetchUserGyms, listOrSearchGyms, getUserMemberships } from "./controllers/gyms";
import { verifyJWT } from "./middlewares/verify-jwt";
import { verifyUserRole } from "./middlewares/verify-user-role";
import { addTurnstile, getTurnstileQRCode, getTurnstileCheckIns, listGymTurnstiles } from "./controllers/turnstiles";
import { registerToGym } from "./controllers/gym-members";
import { deleteTurnstile } from "./controllers/turnstiles";
import { getRemainingCheckIns } from "./controllers/check-ins";

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

  // Custom parser for the registerToGym route
  app.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
    try {
      var json = body.length ? JSON.parse(body) : {}
      done(null, json)
    } catch (err) {
      err.statusCode = 400
      done(err, undefined)
    }
  })

  // New route for gym members
  app.post('/gyms/:id/register', { 
    onRequest: [verifyJWT],
  }, registerToGym);

  // New route to list gym turnstiles
  app.get('/gyms/:gymId/turnstiles', { onRequest: [verifyJWT, verifyUserRole('GYM_OWNER')] }, listGymTurnstiles);

  // Nova rota para deletar uma catraca
  app.delete('/turnstiles/:id', { onRequest: [verifyJWT, verifyUserRole('GYM_OWNER')] }, deleteTurnstile);

  // New route to list all gyms or search for gyms
  app.get('/gyms', { onRequest: [verifyJWT] }, listOrSearchGyms);

  // New route to get user's gym memberships
  app.get('/user/memberships', { onRequest: [verifyJWT] }, getUserMemberships);

  // Nova rota para obter os check-ins restantes
  app.get('/check-ins/remaining', { onRequest: [verifyJWT] }, getRemainingCheckIns);
}
