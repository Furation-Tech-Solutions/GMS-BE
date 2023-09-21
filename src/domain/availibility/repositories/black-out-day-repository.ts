


import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { BlackoutDayEntity, BlackoutDayModel } from "../entities/black-out-day-entity";


export interface BlackoutDayRepository {
  createBlackoutDay(blackoutDay: BlackoutDayModel): Promise<Either<ErrorClass, BlackoutDayEntity>>;
  updateBlackoutDay( id: string , blackoutDayData: BlackoutDayModel ): Promise<Either<ErrorClass, BlackoutDayEntity>>
  getBlackoutDayById( id: string ): Promise<Either<ErrorClass, BlackoutDayEntity>>
  deleteBlackoutDay(id: string): Promise<Either<ErrorClass, void>>;
  getAllBlackoutDay(): Promise<Either<ErrorClass, BlackoutDayEntity[]>>;
}
 