import fastify from "fastify";
import { appRoutes } from "./http/routes";
import cors from "@fastify/cors";

const app = fastify();

// Configuração do CORS
app.register(cors, {
  origin: true, // Permitir todas as origens (ou especificar a origem correta)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
});

app.register(appRoutes);

app.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});

export { app };
