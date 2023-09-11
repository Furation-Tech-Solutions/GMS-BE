

import { ProgramScheduleEntity } from "@domain/availibility/entities/daily-program-entity";
import { ProgramScheduleRepository } from "@domain/availibility/repositories/daily-program-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetProgramScheduleByIdUsecase {
  execute: (programId: string) => Promise<Either<ErrorClass, ProgramScheduleEntity>>;
}

export class GetProgramScheduleById implements GetProgramScheduleByIdUsecase {
  private readonly programScheduleRepository: ProgramScheduleRepository;

  constructor(programScheduleRepository: ProgramScheduleRepository) {
    this.programScheduleRepository = programScheduleRepository;
  }

  async execute(programId: string): Promise<Either<ErrorClass, ProgramScheduleEntity>> {
    return await this.programScheduleRepository.getProgramScheduleById(programId);
  }
}
