import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { SeatingAreaEntity, SeatingAreaModel } from "../entities/seating-area";

export interface SeatingAreaRepository {
  // createSeatingArea(
  //   seatingArea: SeatingAreaModel
  // ): Promise<Either<ErrorClass, SeatingAreaEntity>>;
  createSeatingArea(seatingArea: SeatingAreaModel): Promise<Either<ErrorClass, SeatingAreaEntity>>;
  getSeatingAreaById(id: string): Promise<Either<ErrorClass, SeatingAreaEntity>>;
  getSeatingAreas(): Promise<Either<ErrorClass, SeatingAreaEntity[]>>;
  updateSeatingArea(
    id: string,
    seatingArea: SeatingAreaModel
  ): Promise<Either<ErrorClass, SeatingAreaEntity>>;
  deleteSeatingArea(id: string): Promise<Either<ErrorClass, void>>;
}
