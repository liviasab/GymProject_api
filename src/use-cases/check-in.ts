
import {CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUserCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUserCaseResponde{
  checkIn: CheckIn;
}




export class CheckInUserCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute( {
    userId,
    gymId,
  } : CheckInUserCaseRequest): Promise<CheckInUserCaseResponde> {

    const checkIn = await this.checkInsRepository.create({

        gym_id: gymId,
        user_id: userId,


    })
      
      return {
        checkIn,
      };
    }

}