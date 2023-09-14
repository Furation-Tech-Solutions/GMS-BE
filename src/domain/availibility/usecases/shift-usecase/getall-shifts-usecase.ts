
import { ShiftEntity } from "@domain/availibility/entities/shift-entity";
import { ShiftRepository } from "@domain/availibility/repositories/shift-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetAllShiftsUsecase {
  execute: () => Promise<Either<ErrorClass, ShiftEntity[]>>;
}

export class GetAllShifts implements GetAllShiftsUsecase {
  private readonly shiftRepository: ShiftRepository;

  constructor(shiftRepository: ShiftRepository) {
    this.shiftRepository = shiftRepository;
  }

  async execute(): Promise<Either<ErrorClass, ShiftEntity[]>> {
    return await this.shiftRepository.getAllShifts();
  }
}
