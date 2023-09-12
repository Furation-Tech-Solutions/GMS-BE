// Import necessary classes, interfaces, and dependencies
import { NextFunction, Request, Response } from "express";
import {
  OutletModel,
  OutletEntity,
  OutletMapper,
} from "@domain/outlet/entities/outlet";
import { CreateOutletUsecase } from "@domain/outlet/usecases/create-outlet";
import { GetOutletByIdUsecase } from "@domain/outlet/usecases/get-outlet-by-id";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { GetAllOutletsUsecase } from "@domain/outlet/usecases/get-outlets";
import { UpdateOutletUsecase } from "@domain/outlet/usecases/update-outlet";
import { DeleteOutletUsecase } from "@domain/outlet/usecases/delete-outlet";
import { SuspendOutletUsecase } from "@domain/outlet/usecases/suspend-outlet";
import { ReactivateOutletUsecase } from "@domain/outlet/usecases/reactivate-outlet";
import { Either } from "monet";

export class OutletService {
  private readonly createOutletUsecase: CreateOutletUsecase;
  private readonly getOutletByIdUsecase: GetOutletByIdUsecase;
  private readonly getAllOutletsUsecase: GetAllOutletsUsecase;
  private readonly updateOutletUsecase: UpdateOutletUsecase;
  private readonly deleteOutletUsecase: DeleteOutletUsecase;
  private readonly suspendOutletUsecase: SuspendOutletUsecase;
  private readonly reactivateOutletUsecase: ReactivateOutletUsecase;

  constructor(
    createOutletUsecase: CreateOutletUsecase,
    getOutletByIdUsecase: GetOutletByIdUsecase,
    getAllOutletsUsecase: GetAllOutletsUsecase,
    updateOutletUsecase: UpdateOutletUsecase,
    deleteOutletUsecase: DeleteOutletUsecase,
    suspendOutletUsecase: SuspendOutletUsecase,
    reactivateOutletUsecase: ReactivateOutletUsecase
  ) {
    this.createOutletUsecase = createOutletUsecase;
    this.getOutletByIdUsecase = getOutletByIdUsecase;
    this.getAllOutletsUsecase = getAllOutletsUsecase;
    this.updateOutletUsecase = updateOutletUsecase;
    this.deleteOutletUsecase = deleteOutletUsecase;
    this.suspendOutletUsecase = suspendOutletUsecase;
    this.reactivateOutletUsecase = reactivateOutletUsecase;
  }

  async createOutlet(req: Request, res: Response): Promise<void> {
    const outletData: OutletModel = OutletMapper.toModel(req.body);

    const newOutlet: Either<ErrorClass, OutletEntity> =
      await this.createOutletUsecase.execute(outletData);

    newOutlet.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: OutletEntity) => {
        const resData = OutletMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getOutletById(req: Request, res: Response): Promise<void> {
    const outletId: string = req.params.outletId;
    const outlet: Either<ErrorClass, OutletEntity> =
      await this.getOutletByIdUsecase.execute(outletId);

    outlet.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      (result: OutletEntity) => {
        const resData = OutletMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllOutlets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllOutletsUsecase to get all outlets
    const outlets: Either<ErrorClass, OutletEntity[]> =
      await this.getAllOutletsUsecase.execute();
    console.log(outlets);
    outlets.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (outlets: OutletEntity[]) => {
        const resData = outlets.map((outlet) => OutletMapper.toEntity(outlet));
        return res.json(resData);
      }
    );
  }

  async deleteOutlet(req: Request, res: Response): Promise<void> {
    const outletId: string = req.params.outletId;

    const deleteOutlet = await this.deleteOutletUsecase.execute(outletId);

    deleteOutlet.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        const resData = "Deleted successfully";
        return res.json(resData);
      }
    );
  }

  async updateOutlet(req: Request, res: Response): Promise<void> {
    const outletId: string = req.params.outletId;
    const outletData: OutletModel = req.body;
    // Get the existing outlet by ID
    const existingOutlet: Either<ErrorClass, OutletEntity> =
      await this.getOutletByIdUsecase.execute(outletId);

    existingOutlet.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: OutletEntity) => {
        const resData = OutletMapper.toEntity(result, true);
        const updatedOutletEntity: OutletEntity = OutletMapper.toEntity(
          outletData,
          true,
          resData
        );

        // Call the UpdateOutletUsecase to update the outlet
        const updatedOutlet: Either<ErrorClass, OutletEntity> =
          await this.updateOutletUsecase.execute(outletId, updatedOutletEntity);

        updatedOutlet.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: OutletEntity) => {
            // Convert updatedOutlet from OutletEntity to plain JSON object using OutletMapper
            const responseData = OutletMapper.toModel(response);

            // Send the updated outlet as a JSON response
            res.json(responseData);
          }
        );
      }
    );
  }

  async suspendOutlet(req: Request, res: Response): Promise<void> {
    const outletId: string = req.params.outletId;

    const suspendOutlet = await this.suspendOutletUsecase.execute(outletId);

    suspendOutlet.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        const resData = "Suspended successfully";
        return res.json(resData);
      }
    );
  }

  async reactivateOutlet(req: Request, res: Response): Promise<any> {
    const outletId: string = req.params.outletId;

    const reactivateOutlet = await this.reactivateOutletUsecase.execute(
      outletId
    );

    reactivateOutlet.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        const resData = "Reactivated successfully";
        return res.json(resData);
      }
    );
  }
}
