import { prisma } from "@/lib/prisma";
import { Prisma, Turnstile } from "@prisma/client";
import { TurnstilesRepository } from "../turnstiles-repository";
import { randomUUID } from "crypto";

export class PrismaTurnstilesRepository implements TurnstilesRepository {
  async create(gymId: string): Promise<Turnstile> {
    const turnstile = await prisma.turnstile.create({
      data: {
        gymId,
        qrCode: randomUUID(), // Gera um UUID único para o qrCode
      },
    });
    return turnstile;
  }

  async findById(id: string): Promise<Turnstile | null> {
    const turnstile = await prisma.turnstile.findUnique({
      where: { id },
    });
    return turnstile;
  }

  async findByQRCode(qrCode: string): Promise<Turnstile | null> {
    const turnstile = await prisma.turnstile.findUnique({
      where: { qrCode },
    });
    return turnstile;
  }

  async findManyByGymId(gymId: string): Promise<Turnstile[]> {
    const turnstiles = await prisma.turnstile.findMany({
      where: { gymId },
    });
    return turnstiles;
  }

  async delete(id: string): Promise<void> {
    await prisma.turnstile.delete({
      where: { id },
    });
  }
}