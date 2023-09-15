
import { ShiftEntity, ShiftModel } from "@domain/availibility/entities/shift-entity";
import { ShiftRepository } from "@domain/availibility/repositories/shift-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface UpdateShiftUsecase {
  execute: (
    shiftId: string,
    shiftData: ShiftModel
  ) => Promise<Either<ErrorClass, ShiftEntity>>;
}

export class UpdateShift implements UpdateShiftUsecase {
  private readonly shiftRepository: ShiftRepository;

  constructor(shiftRepository: ShiftRepository) {
    this.shiftRepository = shiftRepository;
  }

  async execute(
    shiftId: string,
    shiftData: ShiftModel
  ): Promise<Either<ErrorClass, ShiftEntity>> {
    return await this.shiftRepository.updateShift(shiftId, shiftData);
  }
}
