

import { BlackoutDayEntity } from "@domain/availibility/entities/black-out-day-entity";
import { BlackoutDayRepository } from "@domain/availibility/repositories/black-out-day-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetBlackouDayByIdUsecase {
  execute: (blackoutId: string) => Promise<Either<ErrorClass, BlackoutDayEntity>>;
}

export class GetBlackouDayById implements GetBlackouDayByIdUsecase {
  private readonly blackouDayRepository: BlackoutDayRepository;

  constructor(blackouDayRepository: BlackoutDayRepository) {
    this.blackouDayRepository = blackouDayRepository;
  }

  async execute(blackoutId: string): Promise<Either<ErrorClass, BlackoutDayEntity>> {
    return await this.blackouDayRepository.getBlackoutDayById(blackoutId);
  }
}
