
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { CheckInEntity, CheckInModel } from "../entities/check-in-entities";


export interface CheckInRepository {
  createCheckIn(checkIn: CheckInModel): Promise<Either<ErrorClass, CheckInEntity>>;
  updateCheckIn( id: string , shiftData: CheckInModel ): Promise<Either<ErrorClass, CheckInEntity>>
  getCheckInById( id: string ): Promise<Either<ErrorClass, CheckInEntity>>
  deleteCheckIn(id: string): Promise<Either<ErrorClass, void>>;
  getAllCheckIn(): Promise<Either<ErrorClass, CheckInEntity[]>>;
}
 