import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface ListOrSearchGymsUseCaseRequest {
  page: number;
  per_page: number;
  search?: string;
}

interface ListOrSearchGymsUseCaseResponse {
  gyms: Gym[];
  total: number;
  total_pages: number;
}

export class ListOrSearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ page, per_page, search }: ListOrSearchGymsUseCaseRequest): Promise<ListOrSearchGymsUseCaseResponse> {
    const { gyms, total } = await this.gymsRepository.findMany(page, per_page, search);

    const total_pages = Math.ceil(total / per_page);

    return { gyms, total, total_pages };
  }
}