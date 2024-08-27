import { PrismaTurnstilesRepository } from "@/repositories/prisma/prisma-turnstiles-repository"
import { ProcessQRCodeUseCase } from "../process-qr-code"

export function makeProcessQRCodeUseCase() {
  const turnstilesRepository = new PrismaTurnstilesRepository()
  const processQRCodeUseCase = new ProcessQRCodeUseCase(turnstilesRepository)

  return processQRCodeUseCase
}