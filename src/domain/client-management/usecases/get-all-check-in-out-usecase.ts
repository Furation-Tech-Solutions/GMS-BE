
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { CheckInCheckOutEntity } from "../entities/check-in-out-entities";
import { CheckInCheckOutRepository } from "../repositories/check-in-out-repository";

export interface GetAllCheckInCheckOutUsecase {
  execute: () => Promise<Either<ErrorClass, CheckInCheckOutEntity[]>>;
}

export class GetAllCheckInCheckOut implements GetAllCheckInCheckOutUsecase {
  private readonly checkInCheckOutRepository: CheckInCheckOutRepository;

  constructor(checkInCheckOutRepository: CheckInCheckOutRepository) {
    this.checkInCheckOutRepository = checkInCheckOutRepository;
  }

  async execute(): Promise<Either<ErrorClass, CheckInCheckOutEntity[]>> {
    return await this.checkInCheckOutRepository.getAllCheckOut()
  }
}
