

import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { CheckInCheckOutRepository } from "../repositories/check-in-out-repository";

export interface DeleteCheckInCheckOutUsecase {
  execute: (checkId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteCheckInCheckOut implements DeleteCheckInCheckOutUsecase {
  private readonly checkInCheckOutRepository: CheckInCheckOutRepository;

  constructor(checkInCheckOutRepository: CheckInCheckOutRepository) {
    this.checkInCheckOutRepository = checkInCheckOutRepository;
  }

  async execute(checkId: string): Promise<Either<ErrorClass, void>> {
    return await this.checkInCheckOutRepository.deleteCheckOut(checkId);
  }
}
