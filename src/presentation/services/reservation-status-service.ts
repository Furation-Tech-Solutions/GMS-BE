// Import necessary classes, interfaces, and dependencies
import { NextFunction, Request, Response } from "express";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { CreateReservationStatusUsecase } from "@domain/reservation-status/usecases/create-reservation-status";
import {
  ReservationStatusEntity,
  ReservationStatusMapper,
  ReservationStatusModel,
} from "@domain/reservation-status/entities/reservation-status";
import { GetReservationStatusByIdUsecase } from "@domain/reservation-status/usecases/get-reservation-status-by-id";
import { GetAllReservationStatusUsecase } from "@domain/reservation-status/usecases/get-reservation-status";
import { UpdateReservationStatusUsecase } from "@domain/reservation-status/usecases/update-reservation-status";
import { DeleteReservationStatusUsecase } from "@domain/reservation-status/usecases/delete-reservation-status";

export class ReservationStatusService {
  private readonly createReservationStatusUsecase: CreateReservationStatusUsecase;
  private readonly getReservationStatusByIdUsecase: GetReservationStatusByIdUsecase;
  private readonly getAllReservationStatusUsecase: GetAllReservationStatusUsecase;
  private readonly updateReservationStatusUsecase: UpdateReservationStatusUsecase;
  private readonly deleteReservationStatusUsecase: DeleteReservationStatusUsecase;

  constructor(
    createReservationStatusUsecase: CreateReservationStatusUsecase,
    getReservationStatusByIdUsecase: GetReservationStatusByIdUsecase,
    getAllReservationStatusUsecase: GetAllReservationStatusUsecase,
    updateReservationStatusUsecase: UpdateReservationStatusUsecase,
    deleteReservationStatusUsecase: DeleteReservationStatusUsecase
  ) {
    this.createReservationStatusUsecase = createReservationStatusUsecase;
    this.getReservationStatusByIdUsecase = getReservationStatusByIdUsecase;
    this.getAllReservationStatusUsecase = getAllReservationStatusUsecase;
    this.updateReservationStatusUsecase = updateReservationStatusUsecase;
    this.deleteReservationStatusUsecase = deleteReservationStatusUsecase;
  }

  async createReservationStatus(req: Request, res: Response): Promise<void> {
    const user = req.user;
    const outletId=req.outletId
    const newReservattionStatusData = {
      ...req.body,
      statusName: req.body.statusName.toLowerCase(),
      outletId:outletId,
      createdBy: user._id,
      updatedBy: user._id,
    };

    const reservationStatusData: ReservationStatusModel =
      ReservationStatusMapper.toModel(newReservattionStatusData);

    const newResevationStatus: Either<ErrorClass, ReservationStatusEntity> =
      await this.createReservationStatusUsecase.execute(reservationStatusData);

    newResevationStatus.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: ReservationStatusEntity) => {
        const resData = ReservationStatusMapper.toEntity(result, true);
        return res.status(201).json(resData);
      }
    );
  }

  async getReservationStatusById(req: Request, res: Response): Promise<void> {
    const reservationStatusId: string = req.params.reservationStatusId;
    const reservationStatus: Either<ErrorClass, ReservationStatusEntity> =
      await this.getReservationStatusByIdUsecase.execute(reservationStatusId);

    reservationStatus.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      (result: ReservationStatusEntity) => {
        const resData = ReservationStatusMapper.toEntity(result, true);
        return res.status(200).json(resData);
      }
    );
  }

  async getAllReservationStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllOutletsUsecase to get all outlets
    const outletId=req.outletId as string
    const allReservationStatus: Either<ErrorClass, ReservationStatusEntity[]> =
      await this.getAllReservationStatusUsecase.execute(outletId);
    // console.log(allReservationStatus);
    allReservationStatus.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (reservationStatus: ReservationStatusEntity[]) => {
        const { classification, search } = req.query;

        let resData = reservationStatus.map((reservationStatus) =>
          ReservationStatusMapper.toEntity(reservationStatus)
        );

        // Filter by classification
        if (classification && typeof classification === "string") {
          resData = resData.filter((item) => {
            if (item) {
              return (
                item.classification.toLowerCase() ===
                classification.toLowerCase()
              );
            }
            return false;
          });
        }

        // Search
        if (search && typeof search === "string") {
          const regex = new RegExp(search, "i");
          resData = resData.filter((item) => {
            return regex.test(item.statusName);
          });
        }

        return res.status(200).json(resData);
      }
    );
  }

  async deleteReservationStatus(req: Request, res: Response): Promise<void> {
    const reservationStatusId: string = req.params.reservationStatusId;

    const deleteReservationStatus =
      await this.deleteReservationStatusUsecase.execute(reservationStatusId);

    deleteReservationStatus.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        const resData = "Deleted successfully";
        return res.status(204).json(resData);
      }
    );
  }

  async updateReservationStatus(req: Request, res: Response): Promise<void> {
    const reservationStatusId: string = req.params.reservationStatusId;
    const user = req.user;
    const newReservattionStatusData = {
      ...req.body,
      updatedBy: user._id,
    };
    const reservationStatusData: ReservationStatusModel =
      newReservattionStatusData;

    // Get the existing outlet by ID
    const existingReservationStatus: Either<
      ErrorClass,
      ReservationStatusEntity
    > = await this.getReservationStatusByIdUsecase.execute(reservationStatusId);

    existingReservationStatus.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: ReservationStatusEntity) => {
        const resData = ReservationStatusMapper.toEntity(result, true);
        const updatedReservationStatusEntity: ReservationStatusEntity =
          ReservationStatusMapper.toEntity(
            reservationStatusData,
            true,
            resData
          );

        // Call the UpdateOutletUsecase to update the outlet
        const updatedReservationStatus: Either<
          ErrorClass,
          ReservationStatusEntity
        > = await this.updateReservationStatusUsecase.execute(
          reservationStatusId,
          updatedReservationStatusEntity
        );

        updatedReservationStatus.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: ReservationStatusEntity) => {
            // Convert updatedOutlet from OutletEntity to plain JSON object using OutletMapper
            //  console.log(response,"response i updated reservation")
            const responseData = ReservationStatusMapper.toEntity(response);

            // Send the updated outlet as a JSON response
            res.status(200).json(responseData);
          }
        );
      }
    );
  }
}
