import { NextFunction, Request, Response } from "express";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { CreateAddReservationUsecase } from "@domain/add-reservation/usecases/create-add-reservation";
import { DeleteAddReservationUsecase } from "@domain/add-reservation/usecases/delete-add-reservation";
import { GetAddReservationByIdUsecase } from "@domain/add-reservation/usecases/get-add-reservation-by-id";
import { GetAllAddReservationUsecase } from "@domain/add-reservation/usecases/get-all-add-reservation";
import { UpdateAddReservationUsecase } from "@domain/add-reservation/usecases/update-add-reservation";
import {
  AddReservationEntity,
  AddReservationMapper,
  AddReservationModel,
} from "@domain/add-reservation/entities/add-reservation";

export class AddReservationServices {
  private readonly createAddReservationUsecase: CreateAddReservationUsecase;
  private readonly deleteAddReservationUsecase: DeleteAddReservationUsecase;
  private readonly getAddReservationByIdUsecase: GetAddReservationByIdUsecase;
  private readonly getAllAddReservationUsecase: GetAllAddReservationUsecase;
  private readonly updateAddReservationUsecase: UpdateAddReservationUsecase;

  constructor(
    createAddReservationUsecase: CreateAddReservationUsecase,
    deleteAddReservationUsecase: DeleteAddReservationUsecase,
    getAddReservationByIdUsecase: GetAddReservationByIdUsecase,
    getAllAddReservationUsecase: GetAllAddReservationUsecase,
    updateAddReservationUsecase: UpdateAddReservationUsecase
  ) {
    this.createAddReservationUsecase = createAddReservationUsecase;
    this.deleteAddReservationUsecase = deleteAddReservationUsecase;
    this.getAddReservationByIdUsecase = getAddReservationByIdUsecase;
    this.getAllAddReservationUsecase = getAllAddReservationUsecase;
    this.updateAddReservationUsecase = updateAddReservationUsecase;
  }

  async createAddReservation(req: Request, res: Response): Promise<void> {
    const addReservationData: AddReservationModel =
      AddReservationMapper.toModel(req.body);

    const newAddReservation: Either<ErrorClass, AddReservationEntity> =
      await this.createAddReservationUsecase.execute(addReservationData);

    newAddReservation.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AddReservationEntity) => {
        const resData = AddReservationMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async deleteAddReservation(req: Request, res: Response): Promise<void> {
    const addReservationId: string = req.params.addReservationId;

    const deletedAddReservation: Either<ErrorClass, void> =
      await this.deleteAddReservationUsecase.execute(addReservationId);

    deletedAddReservation.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        return res.json({
          message: "Reservation Tag category deleted successfully.",
        });
      }
    );
  }

  async getAddReservationById(req: Request, res: Response): Promise<void> {
    const addReservationId: string = req.params.addReservationId;

    const addReservation: Either<ErrorClass, AddReservationEntity> =
      await this.getAddReservationByIdUsecase.execute(addReservationId);

    addReservation.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AddReservationEntity) => {
        if (!result) {
          return res.json({ message: "Client Tag category not found." });
        }
        const resData = AddReservationMapper.toEntity(result);
        return res.json(resData);
      }
    );
  }

  async getAllAddReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const addReservations: Either<ErrorClass, AddReservationEntity[]> =
      await this.getAllAddReservationUsecase.execute();

    addReservations.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AddReservationEntity[]) => {
        const responseData = result.map((addReservation) =>
          AddReservationMapper.toEntity(addReservation)
        );
        return res.json(responseData);
      }
    );
  }

  async updateAddReservation(req: Request, res: Response): Promise<void> {
    const addReservationId: string = req.params.addReservationId;
    const addReservationData: AddReservationModel = req.body;

    const existingAddReservation: Either<ErrorClass, AddReservationEntity> =
      await this.getAddReservationByIdUsecase.execute(addReservationId);

    existingAddReservation.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },

      async (existingAddReservationData: AddReservationEntity) => {
        const updatedAddReservationEntity: AddReservationEntity =
          AddReservationMapper.toEntity(
            addReservationData,
            true,
            existingAddReservationData
          );

        const updatedAddReservation: Either<ErrorClass, AddReservationEntity> =
          await this.updateAddReservationUsecase.execute(
            addReservationId,
            updatedAddReservationEntity
          );

        updatedAddReservation.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (result: AddReservationEntity) => {
            const resData = AddReservationMapper.toEntity(result, true);
            res.json(resData);
          }
        );
      }
    );
  }
}
