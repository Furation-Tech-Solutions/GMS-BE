import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Right, Left } from "monet";
import { AddReservationEntity } from "../entities/add-reservation";
import { AddReservationRepository } from "../repositories/add-reservation-repositories";

export interface GetAddReservationByIdUsecase {
  execute: (
    addReservationId: string
  ) => Promise<Either<ErrorClass, AddReservationEntity>>;
}

export class GetAddReservationById implements GetAddReservationByIdUsecase {
  private readonly addReservationRepository: AddReservationRepository;

  constructor(addReservationRepository: AddReservationRepository) {
    this.addReservationRepository = addReservationRepository;
  }

  async execute(
    addReservationId: string
  ): Promise<Either<ErrorClass, AddReservationEntity>> {
    return await this.addReservationRepository.getAddReservationById(
      addReservationId
    );
  }
}
