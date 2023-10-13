import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Right, Left } from "monet";
import { AddReservationEntity } from "../entities/add-reservation";
import { AddReservationRepository } from "../repositories/add-reservation-repositories";
import { IRFilter } from "types/add-reservation-filter.ts/filter-type";

export interface GetAllAddReservationUsecase {
  execute: (
    filter: IRFilter
  ) => Promise<Either<ErrorClass, AddReservationEntity[]>>;
}

export class GetAllAddReservation implements GetAllAddReservationUsecase {
  private readonly addReservationRepository: AddReservationRepository;

  constructor(addReservationRepository: AddReservationRepository) {
    this.addReservationRepository = addReservationRepository;
  }

  async execute(
    filter: IRFilter
  ): Promise<Either<ErrorClass, AddReservationEntity[]>> {
    return await this.addReservationRepository.getAllAddReservation(filter);
  }
}
