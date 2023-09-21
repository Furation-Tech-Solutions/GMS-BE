

import { BlackoutDayRepository } from "@domain/availibility/repositories/black-out-day-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteBlackouDayUsecase {
  execute: (blackoutId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteBlackouDay implements DeleteBlackouDayUsecase {
  private readonly blackouDayRepository: BlackoutDayRepository;

  constructor(blackouDayRepository: BlackoutDayRepository) {
    this.blackouDayRepository = blackouDayRepository;
  }

  async execute(blackoutId: string): Promise<Either<ErrorClass, void>> {
    return await this.blackouDayRepository.deleteBlackoutDay(blackoutId)
  }
}
