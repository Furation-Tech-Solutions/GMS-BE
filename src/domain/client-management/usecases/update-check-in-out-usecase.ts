
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { CheckInCheckOutRepository } from "../repositories/check-in-out-repository";
import { CheckInCheckOutEntity, CheckInCheckOutModel } from "../entities/check-in-out-entities";

export interface UpdateCheckInCheckOutUsecase {
  execute: (
    checkId: string,
    checkInCheckOutData: CheckInCheckOutModel,
  ) => Promise<Either<ErrorClass, CheckInCheckOutEntity>>;
}

export class UpdateCheckInCheckOut implements UpdateCheckInCheckOutUsecase {
  private readonly checkInCheckOutRepository: CheckInCheckOutRepository;

  constructor(checkInCheckOutRepository: CheckInCheckOutRepository) {
    this.checkInCheckOutRepository = checkInCheckOutRepository;
  }

  async execute(
    checkId: string,
    checkInCheckOutData: CheckInCheckOutModel,
  ): Promise<Either<ErrorClass, CheckInCheckOutEntity>> {
    return await this.checkInCheckOutRepository.updateCheckOut(checkId, checkInCheckOutData);
  }
}
