import { Turnstile } from "@prisma/client";
import { TurnstilesRepository } from "../turnstiles-repository";
import { randomUUID } from "node:crypto";

export class InMemoryTurnstilesRepository implements TurnstilesRepository {
  public items: Turnstile[] = [];

  async findByQRCode(qrCode: string): Promise<Turnstile | null> {
    const turnstile = this.items.find(item => item.qrCode === qrCode);
    return turnstile || null;
  }

  async create(gymId: string): Promise<Turnstile> {
    const turnstile: Turnstile = {
      id: randomUUID(),
      qrCode: randomUUID(),
      gymId,
    };

    this.items.push(turnstile);

    return turnstile;
  }
}