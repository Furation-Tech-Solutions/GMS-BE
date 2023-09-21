import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { SeatingAreaEntity } from "../entities/seating-area";
import { SeatingAreaRepository } from "../repositories/seating-area-repository";

export interface GetSeatingAreaByIdUsecase {
  execute: (
    seatingAreaData: string
  ) => Promise<Either<ErrorClass, SeatingAreaEntity>>;
}

export class GetSeatingAreaById implements GetSeatingAreaByIdUsecase {
  private readonly seatingAreaRepository: SeatingAreaRepository;

  constructor(seatingAreaRepository: SeatingAreaRepository) {
    this.seatingAreaRepository = seatingAreaRepository;
  }

  async execute(
    seatingAreaId: string
  ): Promise<Either<ErrorClass, SeatingAreaEntity>> {
    return await this.seatingAreaRepository.getSeatingAreaById(seatingAreaId);
  }
}
