import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { SeatingAreaRepository } from "../repositories/seating-area-repository";

export interface DeleteSeatingAreaUsecase {
  execute: (seatingAreaId: string) => Promise<Either<ErrorClass, void>>;
}
export class DeleteSeatingArea implements DeleteSeatingAreaUsecase {
  private readonly seatingAreaRepository: SeatingAreaRepository;
  constructor(seatingAreaRepository: SeatingAreaRepository) {
    this.seatingAreaRepository = seatingAreaRepository;
  }
  async execute(seatingAreaId: string): Promise<Either<ErrorClass, void>> {
    return await this.seatingAreaRepository.deleteSeatingArea(seatingAreaId);
  }
}
