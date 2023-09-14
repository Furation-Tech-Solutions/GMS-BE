import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { ReservationStatusModel } from "@domain/reservation-status/entities/reservation-status";
import { ReservationStatus } from "../models/reservation-status-model";

export interface ReservationStatusDataSource {
  create(reservationStatus: ReservationStatusModel): Promise<any>;
  getById(id: string): Promise<any | null>;
  getAllReservationStauts(): Promise<any[]>;
  update(id: string, reservationStatus: ReservationStatusModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class ReservationStatusDataSourceImpl
  implements ReservationStatusDataSource
{
  constructor(private db: mongoose.Connection) {}

  async create(reservationStatus: ReservationStatusModel): Promise<any> {
    const existingReservationStatus = await ReservationStatus.findOne({
      statusName: reservationStatus.statusName,
    });

    if (existingReservationStatus) {
      throw ApiError.emailExist();
    }

    const reservationStatusData = new ReservationStatus(reservationStatus);

    const createdReservationStatus = await reservationStatusData.save();

    return createdReservationStatus.toObject();
  }

  async getById(id: string): Promise<any | null> {
    const reservationStatus = await ReservationStatus.findById(id);
    return reservationStatus ? reservationStatus.toObject() : null;
  }

  async getAllReservationStauts(): Promise<any[]> {
    const allReservationStatus = await ReservationStatus.find();
    return allReservationStatus.map((reservationStatus) =>
      reservationStatus.toObject()
    );
  }

  async update(id: string, reservationStatus: ReservationStatusModel): Promise<any> {
    const updatedReservationStatus = await ReservationStatus.findByIdAndUpdate(id, reservationStatus, {
      new: true,
    });
    return updatedReservationStatus ? updatedReservationStatus.toObject() : null;
  }

  async delete(id: string): Promise<void> {
    await ReservationStatus.findByIdAndDelete(id);
  }
}
