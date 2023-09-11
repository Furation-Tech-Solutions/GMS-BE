
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";
import { ProgramScheduleDataSource } from "../datasource/daily-programs-datasource";
import { ProgramScheduleEntity, ProgramScheduleModel } from "@domain/availibility/entities/daily-program-entity";
import { ProgramScheduleRepository } from "@domain/availibility/repositories/daily-program-repository";



export class ProgramScheduleRepositoryImpl implements ProgramScheduleRepository {
  private readonly dataSource: ProgramScheduleDataSource;

  constructor(dataSource: ProgramScheduleDataSource) {
    this.dataSource = dataSource;
  }

  async createProgramSchedule(
    programSchedule: ProgramScheduleModel
  ): Promise<Either<ErrorClass, ProgramScheduleEntity>> {
    try {
      let newProgramSchedule = await this.dataSource.create(programSchedule);
      
      return Right<ErrorClass, ProgramScheduleEntity>(newProgramSchedule);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, ProgramScheduleEntity>(ApiError.overlappingShift());
      }
      return Left<ErrorClass, ProgramScheduleEntity>(ApiError.badRequest());
    }
  }


  async updateProgramSchedule(
    id: string,
    programScheduleData: ProgramScheduleModel
  ): Promise<Either<ErrorClass, ProgramScheduleEntity>> {
    try {
      const newProgramSchedule = await this.dataSource.update(id, programScheduleData);
      return Right<ErrorClass, ProgramScheduleEntity>(newProgramSchedule);
    } catch (error) {
      return Left<ErrorClass, ProgramScheduleEntity>(ApiError.badRequest());
    }
  }



  async getProgramScheduleById(id: string ): Promise<Either<ErrorClass, ProgramScheduleEntity>> {
    try {
      let programSchedule = await this.dataSource.read(id);
      return Right<ErrorClass, ProgramScheduleEntity>(programSchedule);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return Left<ErrorClass, ProgramScheduleEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, ProgramScheduleEntity>(ApiError.badRequest());
    }
  }

async deleteProgramSchedule(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const programSchedule = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(programSchedule);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

    async getAllProgramSchedule(): Promise<Either<ErrorClass, ProgramScheduleEntity[]>> {
    try {
      const programSchedule = await this.dataSource.getAll();
      return Right<ErrorClass, ProgramScheduleEntity[]>(programSchedule);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        return Left<ErrorClass, ProgramScheduleEntity[]>(ApiError.emailExist());
      }
      return Left<ErrorClass, ProgramScheduleEntity[]>(ApiError.badRequest());
    }
  }
}
