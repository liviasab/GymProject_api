import { TurnstilesRepository } from "@/repositories/turnstiles-repository";

interface ProcessQRCodeUseCaseRequest {
  qrCode: string;
}

interface ProcessQRCodeUseCaseResponse {
  message: string;
}

export class ProcessQRCodeUseCase {
  constructor(private turnstilesRepository: TurnstilesRepository) {}

  async execute({ qrCode }: ProcessQRCodeUseCaseRequest): Promise<ProcessQRCodeUseCaseResponse> {
    let turnstile = await this.turnstilesRepository.findByQRCode(qrCode);

    if (!turnstile) {
      // If the turnstile doesn't exist, create it
      turnstile = await this.turnstilesRepository.create(qrCode);
    }

    // Here you can add additional logic, like checking if the user is allowed to enter, etc.

    return {
      message: 'QR code processed successfully',
    };
  }
}