


import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { CheckInCheckOutEntity,CheckInCheckOutModel } from "../entities/check-in-out-entities";


export interface CheckInCheckOutRepository {
  createCheckOut(checkIn: string): Promise<Either<ErrorClass, CheckInCheckOutEntity>>;
  deleteCheckOut(id: string): Promise<Either<ErrorClass, void>>;
  updateCheckOut( id: string , shiftData: CheckInCheckOutModel ): Promise<Either<ErrorClass, CheckInCheckOutEntity>>
  getCheckOutById( id: string ): Promise<Either<ErrorClass, CheckInCheckOutEntity>>
  getAllCheckOut(): Promise<Either<ErrorClass, CheckInCheckOutEntity[]>>;
}
 