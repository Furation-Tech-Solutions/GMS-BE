import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { ShiftModel } from "@domain/availibility/entities/shift-entity";
import Shift from "../models/shift-model";
import moment from "moment";
import { AddReservation } from "@data/add-reservation/models/add-reservation-model";

export interface ShiftDataSource {
  create(shift: ShiftModel): Promise<any>;
  update(id: string, shiftData: ShiftModel): Promise<any>;
  read(id: string): Promise<any>;
  delete(id: string): Promise<void>;
  getAll(outletId: string): Promise<any[]>;
}

export class ShiftDataSourceImpl implements ShiftDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(shift: ShiftModel): Promise<any> {
    const overlappingShift = await Shift.findOne({
      $and: [
        {
          firstSeating: shift.firstSeating,
          lastSeating: shift.lastSeating,
        },
        {
          startDate: { $lte: shift.endDate }, // New shift's end date is after or equal to the existing shift's start date
          endDate: { $gte: shift.startDate }, // New shift's start date is before or equal to the existing shift's end date
        },
        {
          outletId: shift.outletId,
        },
      ],
    });

    if (overlappingShift) {
      throw ApiError.overlappingShift();
    }

    const shiftData = new Shift(shift);
    const savedShift: mongoose.Document = await shiftData.save();
    return savedShift.toObject();
  }

  async update(id: string, shiftData: ShiftModel): Promise<any> {
    try {
      const updatedAdmin = await Shift.findByIdAndUpdate(id, shiftData, {
        new: true,
      }); // No need for conversion here
      return updatedAdmin ? updatedAdmin.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async read(id: string): Promise<any> {
    try {
      const shift = await Shift.findById(id);
      if (!shift) {
        throw ApiError.notFound();
      }
      return shift && shift.toObject(); // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    const deletedShift = await Shift.findByIdAndDelete(id);

    //   if (deletedShift) {
    //     await AddReservation.updateMany({ shift: id }, { $unset: { shift: 1 } });
    // } else {
    //     throw ApiError.notFound();
    // }
  }

  async getAll(outletId: string): Promise<any[]> {
    // try {
    const shifts = await Shift.find({ outletId: outletId });
    return shifts.map((shift) => shift.toObject()); // Convert to plain JavaScript objects before returning
    // } catch (error) {
    // throw ApiError.notFound();
    // }
  }
}
