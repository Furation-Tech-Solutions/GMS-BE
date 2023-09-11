


import { ProgramScheduleRepository } from "@domain/availibility/repositories/daily-program-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteProgramScheduleUsecase {
  execute: (programId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteProgramSchedule implements DeleteProgramScheduleUsecase {
  private readonly programScheduleRepository: ProgramScheduleRepository;

  constructor(programScheduleRepository: ProgramScheduleRepository) {
    this.programScheduleRepository = programScheduleRepository;
  }

  async execute(programId: string): Promise<Either<ErrorClass, void>> {
    return await this.programScheduleRepository.deleteProgramSchedule(programId);
  }
}
