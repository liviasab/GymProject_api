import { TurnstilesRepository } from "@/repositories/turnstiles-repository";
import { GymsRepository } from "@/repositories/gyms-repository";

interface GetTurnstileQRCodeUseCaseRequest {
  turnstileId: string;
  ownerId: string;
}

interface GetTurnstileQRCodeUseCaseResponse {
  qrCode: string;
}

export class GetTurnstileQRCodeUseCase {
  constructor(
    private turnstilesRepository: TurnstilesRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({ turnstileId, ownerId }: GetTurnstileQRCodeUseCaseRequest): Promise<GetTurnstileQRCodeUseCaseResponse> {
    const turnstile = await this.turnstilesRepository.findById(turnstileId);

    if (!turnstile) {
      throw new Error('Turnstile not found');
    }

    const gym = await this.gymsRepository.findById(turnstile.gymId);

    if (!gym || gym.ownerId !== ownerId) {
      throw new Error('Unauthorized');
    }

    // Here you would generate or retrieve the QR code for the turnstile
    const qrCode = `turnstile:${turnstile.id}`; // This is a placeholder, implement actual QR code generation

    return { qrCode };
  }
}