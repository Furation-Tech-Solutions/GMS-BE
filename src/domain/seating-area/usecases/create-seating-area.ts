import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { SeatingAreaEntity, SeatingAreaModel } from "../entities/seating-area";
import { SeatingAreaRepository } from "../repositories/seating-area-repository";

export interface CreateSeatingAreaUsecase {
  execute: (
    seatingAreaData: SeatingAreaModel
  ) => Promise<Either<ErrorClass, SeatingAreaEntity>>;
}

export class CreateSeatingArea implements CreateSeatingAreaUsecase {
  private readonly seatingAreaRepository: SeatingAreaRepository;

  constructor(seatingAreaRepository: SeatingAreaRepository) {
    this.seatingAreaRepository = seatingAreaRepository;
  }

  async execute(
    seatingAreaData: SeatingAreaModel
  ): Promise<Either<ErrorClass, SeatingAreaEntity>> {
    const res = await this.seatingAreaRepository.createSeatingArea(
      seatingAreaData
    );
    return res;
  }
}
