// Import necessary classes, interfaces, and dependencies
import { NextFunction, Request, Response } from "express";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { CreateSeatingAreaUsecase } from "@domain/seating-area/usecases/create-seating-area";
import { GetSeatingAreaByIdUsecase } from "@domain/seating-area/usecases/get-seating-area-by-id";
import { GetAllSeatingAreasUsecase } from "@domain/seating-area/usecases/get-seating-area";
import { UpdateSeatingAreaUsecase } from "@domain/seating-area/usecases/update-room";
import { DeleteSeatingAreaUsecase } from "@domain/seating-area/usecases/delete-seating-area";
import {
  SeatingAreaEntity,
  SeatingAreaMapper,
  SeatingAreaModel,
} from "@domain/seating-area/entities/seating-area";

export class SeatingAreaService {
  // private readonly createSeatingAreaUsecase: CreateSeatingAreaUsecase;
  private readonly createSeatingAreaUsecase: CreateSeatingAreaUsecase;
  private readonly getSeatingAreaByIdUsecase: GetSeatingAreaByIdUsecase;
  private readonly getAllSeatingAreasUsecase: GetAllSeatingAreasUsecase;
  private readonly updateSeatingAreaUsecase: UpdateSeatingAreaUsecase;
  private readonly deleteSeatingAreaUsecase: DeleteSeatingAreaUsecase;

  constructor(
    // createSeatingAreaUsecase: CreateSeatingAreaUsecase,
    createSeatingAreaUsecase: CreateSeatingAreaUsecase,
    getSeatingAreaByIdUsecase: GetSeatingAreaByIdUsecase,
    getAllSeatingAreasUsecase: GetAllSeatingAreasUsecase,
    updateSeatingAreaUsecase: UpdateSeatingAreaUsecase,
    deleteSeatingAreaUsecase: DeleteSeatingAreaUsecase
  ) {
    this.createSeatingAreaUsecase = createSeatingAreaUsecase;
    this.getSeatingAreaByIdUsecase = getSeatingAreaByIdUsecase;
    this.getAllSeatingAreasUsecase = getAllSeatingAreasUsecase;
    this.updateSeatingAreaUsecase = updateSeatingAreaUsecase;
    this.deleteSeatingAreaUsecase = deleteSeatingAreaUsecase;
  }

  async createSeatingArea(req: Request, res: Response): Promise<void> {
    const seatingAreaData: SeatingAreaModel = SeatingAreaMapper.toModel(
      req.body
    );

    const newSeatingArea: Either<ErrorClass, SeatingAreaEntity> =
      await this.createSeatingAreaUsecase.execute(seatingAreaData);

    newSeatingArea.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: SeatingAreaEntity) => {
        const resData = SeatingAreaMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getSeatingAreaById(req: Request, res: Response): Promise<void> {
    const seatingAreaId: string = req.params.seatingAreaId;
    const seatingArea: Either<ErrorClass, SeatingAreaEntity> =
      await this.getSeatingAreaByIdUsecase.execute(seatingAreaId);

    seatingArea.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      (result: SeatingAreaEntity) => {
        const resData = SeatingAreaMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllSeatingAreas(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllOutletsUsecase to get all outlets
    const seatingAreas: Either<ErrorClass, SeatingAreaEntity[]> =
      await this.getAllSeatingAreasUsecase.execute();
    console.log(seatingAreas);
    seatingAreas.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (seatingAreas: SeatingAreaEntity[]) => {
        const resData = seatingAreas.map((seatingArea) =>
          SeatingAreaMapper.toEntity(seatingArea)
        );
        return res.json(resData);
      }
    );
  }

  async deleteSeatingArea(req: Request, res: Response): Promise<void> {
    const seatingAreaId: string = req.params.seatingAreaId;

    const deleteSeatingArea = await this.deleteSeatingAreaUsecase.execute(
      seatingAreaId
    );

    deleteSeatingArea.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        const resData = "Deleted successfully";
        return res.json(resData);
      }
    );
  }

  async updateSeatingArea(req: Request, res: Response): Promise<void> {
    const seatingAreaId: string = req.params.seatingAreaId;
    const seatingAreaData: SeatingAreaModel = req.body;
    // Get the existing outlet by ID
    const existingSeatingArea: Either<ErrorClass, SeatingAreaEntity> =
      await this.getSeatingAreaByIdUsecase.execute(seatingAreaId);

    existingSeatingArea.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: SeatingAreaEntity) => {
        const resData = SeatingAreaMapper.toEntity(result, true);
        const updatedSeatingAreaEntity: SeatingAreaEntity =
          SeatingAreaMapper.toEntity(seatingAreaData, true, resData);

        // Call the UpdateOutletUsecase to update the outlet
        const updatedSeatingArea: Either<ErrorClass, SeatingAreaEntity> =
          await this.updateSeatingAreaUsecase.execute(
            seatingAreaId,
            updatedSeatingAreaEntity
          );

        updatedSeatingArea.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: SeatingAreaEntity) => {
            // Convert updatedOutlet from OutletEntity to plain JSON object using OutletMapper
            const responseData = SeatingAreaMapper.toModel(response);

            // Send the updated outlet as a JSON response
            res.json(responseData);
          }
        );
      }
    );
  }
}
