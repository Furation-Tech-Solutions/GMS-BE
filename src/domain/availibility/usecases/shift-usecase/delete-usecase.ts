


import { ShiftRepository } from "@domain/availibility/repositories/shift-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteShiftUsecase {
  execute: (shiftId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteShift implements DeleteShiftUsecase {
  private readonly shiftRepository: ShiftRepository;

  constructor(shiftRepository: ShiftRepository) {
    this.shiftRepository = shiftRepository;
  }

  async execute(shiftId: string): Promise<Either<ErrorClass, void>> {
    return await this.shiftRepository.deleteShift(shiftId);
  }
}
