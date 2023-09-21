import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { SeatingAreaEntity } from "../entities/seating-area";
import { SeatingAreaRepository } from "../repositories/seating-area-repository";


export interface GetAllSeatingAreasUsecase {
  execute: () => Promise<Either<ErrorClass, SeatingAreaEntity[]>>;
}

export class GetAllSeatingAreas implements GetAllSeatingAreasUsecase {
  private readonly seatingAreaRepository: SeatingAreaRepository;

  constructor(seatingAreaRepository: SeatingAreaRepository) {
    this.seatingAreaRepository = seatingAreaRepository;
  }

  async execute(): Promise<Either<ErrorClass, SeatingAreaEntity[]>> {
    return await this.seatingAreaRepository.getSeatingAreas();
  }
}
