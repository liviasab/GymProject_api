import { TurnstilesRepository } from "@/repositories/turnstiles-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface ProcessQRCodeUseCaseRequest {
  qrCode: string;
  userId: string;
}

interface ProcessQRCodeUseCaseResponse {
  message: string;
  remainingCheckIns: number;
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

    const checkInsToday = await this.checkInsRepository.countCheckInsByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInsToday >= 2) {
      throw new Error('User has already used all check-ins for today');
    }

    await this.checkInsRepository.create({
      user_id: userId,
      gym_id: turnstile.gymId,
      turnstileId: turnstile.id,
    });

    const remainingCheckIns = 2 - (checkInsToday + 1);

    return { 
      message: `Check-in successful. You have ${remainingCheckIns} check-in(s) remaining for today.`,
      remainingCheckIns
    };
  }
}