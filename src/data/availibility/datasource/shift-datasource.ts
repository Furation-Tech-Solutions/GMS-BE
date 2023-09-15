
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { ShiftModel } from "@domain/availibility/entities/shift-entity";
import Shift from "../models/shift-model";

export interface ShiftDataSource {
  create(shift: ShiftModel): Promise<any>;
  update(id: string, shiftData: ShiftModel): Promise<any>;
  read(id: string): Promise<any>;
  delete(id: string): Promise<void>;
  getAll() : Promise<any[]>;
}

export class ShiftDataSourceImpl implements ShiftDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(shift: ShiftModel): Promise<any> {

    const overlappingShift = await Shift.findOne({
      daysToRepeatThisShift: shift.daysToRepeatThisShift, // Check for the same day
      $or: [
        {
          $and: [
            { firstSeating: { $lte: shift.firstSeating } }, // New shift starts before or at the same time
            { lastSeating: { $gte: shift.firstSeating } }, // New shift ends after or at the same time
          ],
        },
        {
          $and: [
            { firstSeating: { $lte: shift.lastSeating } }, // New shift starts before or at the same time
            { lastSeating: { $gte: shift.lastSeating } }, // New shift ends after or at the same time
          ],
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
    await Shift.findByIdAndDelete(id);
  }

  async getAll(): Promise<any[]> {
    try {
      const shifts = await Shift.find();
      return shifts.map((shift) => shift.toObject()); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

}
