
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { CheckInCheckOutEntity, CheckInCheckOutModel } from "../entities/check-in-out-entities";
import { CheckInCheckOutRepository } from "../repositories/check-in-out-repository";

export interface CreateCheckInCheckOutUsecase {
  execute: (checkInCheckOutData: string) => Promise<Either<ErrorClass, CheckInCheckOutEntity>>;
}

export class CreateCheckInCheckOut implements CreateCheckInCheckOutUsecase {
  private readonly checkInCheckOutRepository: CheckInCheckOutRepository;

  constructor(checkInCheckOutRepository: CheckInCheckOutRepository) {
    this.checkInCheckOutRepository = checkInCheckOutRepository;
  }

  async execute(checkInCheckOutData: string): Promise<Either<ErrorClass,CheckInCheckOutEntity>> {
    return await this.checkInCheckOutRepository.createCheckOut(checkInCheckOutData);
  }
  
}
