import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Right, Left } from "monet";
import { AddReservationEntity } from "../entities/add-reservation";
import { AddReservationRepository } from "../repositories/add-reservation-repositories";

export interface UpdateAddReservationUsecase {
  execute: (
    addReservationId: string,
    addReservationData: AddReservationEntity
  ) => Promise<Either<ErrorClass, AddReservationEntity>>;
}

export class UpdateAddReservation implements UpdateAddReservationUsecase {
  private readonly addReservationRepository: AddReservationRepository;

  constructor(addReservationRepository: AddReservationRepository) {
    this.addReservationRepository = addReservationRepository;
  }

  async execute(
    addReservationId: string,
    addReservationData: AddReservationEntity
  ): Promise<Either<ErrorClass, AddReservationEntity>> {
    return await this.addReservationRepository.updateAddReservation(
      addReservationId,
      addReservationData
    );
  }
}
