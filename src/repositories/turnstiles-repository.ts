import { Turnstile } from "@prisma/client";

export interface TurnstilesRepository {
  findByQRCode(qrCode: string): Promise<Turnstile | null>;
  create(gymId: string): Promise<Turnstile>;
  findManyByGymId(gymId: string): Promise<Turnstile[]>;
  delete(id: string): Promise<void>;
}