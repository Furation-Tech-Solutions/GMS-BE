


import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { ProgramScheduleEntity, ProgramScheduleModel } from "../entities/daily-program-entity";


export interface ProgramScheduleRepository {
  createProgramSchedule(programSchedule: ProgramScheduleModel): Promise<Either<ErrorClass, ProgramScheduleEntity>>;
  updateProgramSchedule( id: string , programScheduleData: ProgramScheduleModel ): Promise<Either<ErrorClass, ProgramScheduleEntity>>
  getProgramScheduleById( id: string ): Promise<Either<ErrorClass, ProgramScheduleEntity>>
  deleteProgramSchedule(id: string): Promise<Either<ErrorClass, void>>;
  getAllProgramSchedule(): Promise<Either<ErrorClass, ProgramScheduleEntity[]>>;
}
 