import { prisma } from "@/lib/prisma";
import { TurnstilesRepository } from "../turnstiles-repository";

export class PrismaTurnstilesRepository implements TurnstilesRepository {
  async findByQRCode(qrCode: string) {
    const turnstile = await prisma.turnstile.findUnique({
      where: {
        qrCode,
      },
    })

    return turnstile
  }

  async create(qrCode: string) {
    const turnstile = await prisma.turnstile.create({
      data: {
        qrCode,
      },
    })

    return turnstile
  }
}