import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Right, Left } from "monet";
import {
  AddReservationEntity,
  AddReservationModel,
} from "../entities/add-reservation";
import { AddReservationRepository } from "../repositories/add-reservation-repositories";

export interface CreateAddReservationUsecase {
  execute: (
    addReservationData: AddReservationModel
  ) => Promise<Either<ErrorClass, AddReservationEntity>>;
}

export class CreateAddReservation implements CreateAddReservationUsecase {
  private readonly addReservationRepository: AddReservationRepository;
  constructor(addReservationRepository: AddReservationRepository) {
    this.addReservationRepository = addReservationRepository;
  }
  async execute(
    addReservationData: AddReservationModel
  ): Promise<Either<ErrorClass, AddReservationEntity>> {
    return await this.addReservationRepository.createAddReservation(
      addReservationData
    );
  }
}
