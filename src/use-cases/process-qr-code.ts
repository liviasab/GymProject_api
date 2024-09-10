import { TurnstilesRepository } from "@/repositories/turnstiles-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { Prisma } from "@prisma/client";

interface ProcessQRCodeUseCaseRequest {
  qrCode: string;
  userId: string;
}

interface ProcessQRCodeUseCaseResponse {
  message: string;
}

export class ProcessQRCodeUseCase {
  constructor(
    private turnstilesRepository: TurnstilesRepository,
    private usersRepository: UsersRepository,
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({ qrCode, userId }: ProcessQRCodeUseCaseRequest): Promise<ProcessQRCodeUseCaseResponse> {
    const turnstile = await this.turnstilesRepository.findByQRCode(qrCode);

    if (!turnstile) {
      throw new Error('Invalid QR code');
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.balance.isZero() || user.balance.isNegative()) {
      throw new Error('Insufficient balance');
    }

    // Check if the user has already checked in today
    const hasCheckedIn = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

    if (hasCheckedIn) {
      throw new Error('User has already checked in today');
    }

    // Create a new check-in
    await this.checkInsRepository.create({
      user_id: userId,
      gym_id: turnstile.gymId,
      turnstileId: turnstile.id, // Changed from turnstile_id to turnstileId
    });

    // Deduct balance (assuming 1 unit per check-in)
    const newBalance = user.balance.sub(new Prisma.Decimal(1));
    await this.usersRepository.updateBalance(userId, newBalance);

    return { message: 'Check-in successful' };
  }
}