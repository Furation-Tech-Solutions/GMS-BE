import { NextFunction, Request, Response } from "express";

import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { CreateProgramScheduleUsecase } from "@domain/availibility/usecases/daily-programs/create-usecase";
import { DeleteProgramScheduleUsecase } from "@domain/availibility/usecases/daily-programs/delete-usecase";
import { GetProgramScheduleByIdUsecase } from "@domain/availibility/usecases/daily-programs/get-by-id-usecase";
import { UpdateProgramScheduleUsecase } from "@domain/availibility/usecases/daily-programs/update-usecase";
import { GetAllProgramScheduleUsecase } from "@domain/availibility/usecases/daily-programs/getall-usecase";
import { ProgramScheduleEntity, ProgramScheduleMapper, ProgramScheduleModel } from "@domain/availibility/entities/daily-program-entity";

export class ProgramScheduleService {
  private readonly createProgramScheduleUsecase: CreateProgramScheduleUsecase;
  private readonly deleteProgramScheduleUsecase: DeleteProgramScheduleUsecase;
  private readonly getProgramScheduleByIdUsecase: GetProgramScheduleByIdUsecase;
  private readonly updateProgramScheduleUsecase: UpdateProgramScheduleUsecase;
  private readonly getAllProgramScheduleUsecase: GetAllProgramScheduleUsecase;

  constructor(
    createProgramScheduleUsecase: CreateProgramScheduleUsecase,
    deleteProgramScheduleUsecase: DeleteProgramScheduleUsecase,
    getProgramScheduleByIdUsecase: GetProgramScheduleByIdUsecase,
    updateProgramScheduleUsecase: UpdateProgramScheduleUsecase,
    getAllProgramScheduleUsecase: GetAllProgramScheduleUsecase
  ) {
    this.createProgramScheduleUsecase = createProgramScheduleUsecase;
    this.deleteProgramScheduleUsecase = deleteProgramScheduleUsecase;
    this.getProgramScheduleByIdUsecase = getProgramScheduleByIdUsecase;
    this.updateProgramScheduleUsecase = updateProgramScheduleUsecase;
    this.getAllProgramScheduleUsecase = getAllProgramScheduleUsecase;
  }

  async createProgramSchedule(req: Request, res: Response): Promise<void> {
  
    const programScheduleData: ProgramScheduleModel = ProgramScheduleMapper.toModel(req.body);

    const newProgramSchedule: Either<ErrorClass, ProgramScheduleEntity> =
      await this.createProgramScheduleUsecase.execute(programScheduleData);

      newProgramSchedule.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: ProgramScheduleEntity) => {
        const resData = ProgramScheduleMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async deleteProgramSchedule(req: Request, res: Response): Promise<void> {
    const programId: string = req.params.programId;

    // Call the DeleteAdminUsecase to delete the admin
    const response: Either<ErrorClass, void> =
      await this.deleteProgramScheduleUsecase.execute(programId);

    (await response).cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        return res.json({ message: "ProgramSchedule deleted successfully." });
      }
    );
  }

  async getProgramScheduleById(req: Request, res: Response): Promise<void> {

    const programId: string = req.params.programId;
    // Call the getProgramScheduleById to get the [program] by ID
    const programSchedule: Either<ErrorClass, ProgramScheduleEntity> =
      await this.getProgramScheduleByIdUsecase.execute(programId);

      programSchedule.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: ProgramScheduleEntity) => {
        const resData = ProgramScheduleMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }
  async updateProgramSchedule(req: Request, res: Response): Promise<void> {
    const programId: string = req.params.programId;
    const programScheduleData: ProgramScheduleModel = req.body;
    // Get the existing admin by ID
    const existingprogramScheduleData: Either<ErrorClass, ProgramScheduleEntity> =
      await this.getProgramScheduleByIdUsecase.execute(programId);

      existingprogramScheduleData.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: ProgramScheduleEntity) => {
        const resData = ProgramScheduleMapper.toEntity(result, true);
        const updatedProgramScheduleEntity: ProgramScheduleEntity = ProgramScheduleMapper.toEntity(
            programScheduleData,
          true,
          resData
        );

        // Call the UpdateAdminUsecase to update the admin
        const updatedProgramScheduleData: Either<ErrorClass, ProgramScheduleEntity> =
          await this.updateProgramScheduleUsecase.execute(programId, updatedProgramScheduleEntity);

          updatedProgramScheduleData.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: ProgramScheduleEntity) => {
            // Convert updatedAdmin from AdminEntity to plain JSON object using AdminMapper
            const responseData = ProgramScheduleMapper.toModel(response);

            // Send the updated admin as a JSON response
            res.json(responseData);
          }
        );
      }
    );
  }

  async getAllProgramSchedule(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllAdminsUsecase to get all admins
    const programSchedules: Either<ErrorClass, ProgramScheduleEntity[]> =
      await this.getAllProgramScheduleUsecase.execute();

      programSchedules.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (programSchedules: ProgramScheduleEntity[]) => {
        const resData = programSchedules.map((programSchedule) => ProgramScheduleMapper.toEntity(programSchedule));
        return res.json(resData);
      }
    );
  }
}
