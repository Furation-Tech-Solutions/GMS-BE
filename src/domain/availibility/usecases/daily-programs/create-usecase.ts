

import { ProgramScheduleEntity, ProgramScheduleModel } from "@domain/availibility/entities/daily-program-entity";
import { ProgramScheduleRepository } from "@domain/availibility/repositories/daily-program-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface CreateProgramScheduleUsecase {
  execute: (programScheduleData: ProgramScheduleModel) => Promise<Either<ErrorClass, ProgramScheduleEntity>>;
}

export class CreateProgramSchedule implements CreateProgramScheduleUsecase {
  private readonly programScheduleRepository: ProgramScheduleRepository;

  constructor(programScheduleRepository: ProgramScheduleRepository) {
    this.programScheduleRepository = programScheduleRepository;
  }

  async execute(programScheduleData: ProgramScheduleModel): Promise<Either<ErrorClass,ProgramScheduleEntity>> {
    return await this.programScheduleRepository.createProgramSchedule(programScheduleData)
  }
  
}
