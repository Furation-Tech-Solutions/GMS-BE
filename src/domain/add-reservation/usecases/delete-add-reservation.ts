import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Right, Left } from "monet";
import { AddReservationRepository } from "../repositories/add-reservation-repositories";

export interface DeleteAddReservationUsecase {
  execute: (addReservationId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteAddReservation implements DeleteAddReservationUsecase {
  private readonly addReservationRepository: AddReservationRepository;

  constructor(addReservationRepository: AddReservationRepository) {
    this.addReservationRepository = addReservationRepository;
  }

  async execute(addReservationId: string): Promise<Either<ErrorClass, void>> {
    return await this.addReservationRepository.deleteAddReservation(
      addReservationId
    );
  }
}
