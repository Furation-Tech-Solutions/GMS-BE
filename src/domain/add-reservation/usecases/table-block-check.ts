import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Right, Left } from "monet";
import { AddReservationRepository } from "../repositories/add-reservation-repositories";
import { AddReservationEntity } from "../entities/add-reservation";

export interface TableBlockCheckUsecase {
  execute: (
    tableId: string,
    reservationDetail: AddReservationEntity
  ) => Promise<Either<ErrorClass, AddReservationEntity[]>>;
}

export class TableBlockCheck implements TableBlockCheckUsecase {
  private readonly addReservationRepository: AddReservationRepository;

  constructor(addReservationRepository: AddReservationRepository) {
    this.addReservationRepository = addReservationRepository;
  }

  async execute(
    tableId: string,
    reservationDetail: AddReservationEntity
  ): Promise<Either<ErrorClass, AddReservationEntity[]>> {
    return await this.addReservationRepository.tableBlockCheck(
      tableId,
      reservationDetail
    );
  }
}
