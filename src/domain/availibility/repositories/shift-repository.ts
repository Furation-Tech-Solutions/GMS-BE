
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { ShiftEntity, ShiftModel } from "../entities/shift-entity";

export interface ShiftRepository {
  createShift(shift: ShiftModel): Promise<Either<ErrorClass, ShiftEntity>>;
  updateShift( id: string , shiftData: ShiftModel ): Promise<Either<ErrorClass, ShiftEntity>>
  getShiftById( id: string ): Promise<Either<ErrorClass, ShiftEntity>>
  deleteShift(id: string): Promise<Either<ErrorClass, void>>;
  getAllShifts(): Promise<Either<ErrorClass, ShiftEntity[]>>;
}
 