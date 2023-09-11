
import { ShiftEntity, ShiftModel } from "@domain/availibility/entities/shift-entity";
import { ShiftRepository } from "@domain/availibility/repositories/shift-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateShiftUsecase {
  execute: (adminData: ShiftModel) => Promise<Either<ErrorClass, ShiftEntity>>;
}

export class CreateShift implements CreateShiftUsecase {
  private readonly shiftRepository: ShiftRepository;

  constructor(shiftRepository: ShiftRepository) {
    this.shiftRepository = shiftRepository;
  }

  async execute(shiftData: ShiftModel): Promise<Either<ErrorClass,ShiftEntity>> {
    return await this.shiftRepository.createShift(shiftData);
  }
  
}
