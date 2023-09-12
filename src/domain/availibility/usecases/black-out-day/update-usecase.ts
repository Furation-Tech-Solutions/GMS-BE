
import { BlackoutDayEntity, BlackoutDayModel } from "@domain/availibility/entities/black-out-day-entity";
import { BlackoutDayRepository } from "@domain/availibility/repositories/black-out-day-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface UpdateBlackouDayUsecase {
  execute: (
    blackoutId: string,
    blackoutDayData: BlackoutDayModel
  ) => Promise<Either<ErrorClass, BlackoutDayEntity>>;
}

export class UpdateBlackouDay implements UpdateBlackouDayUsecase {
  private readonly blackouDayRepository: BlackoutDayRepository;

  constructor(blackouDayRepository: BlackoutDayRepository) {
    this.blackouDayRepository = blackouDayRepository;
  }

  async execute(
    blackoutId: string,
    blackoutDayData: BlackoutDayModel
  ): Promise<Either<ErrorClass, BlackoutDayEntity>> {
    return await this.blackouDayRepository.updateBlackoutDay(blackoutId, blackoutDayData);
  }
}
