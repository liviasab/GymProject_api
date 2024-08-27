import { Turnstile } from "@prisma/client";

export interface TurnstilesRepository {
  findByQRCode(qrCode: string): Promise<Turnstile | null>
  create(qrCode: string): Promise<Turnstile>
}