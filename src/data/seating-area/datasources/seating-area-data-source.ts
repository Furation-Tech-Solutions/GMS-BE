import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { SeatingAreaModel } from "@domain/seating-area/entities/seating-area";
import { SeatingArea } from "../models/seating-area-model";
import * as HttpStatus from "@presentation/error-handling/http-status";

export interface SeatingAreaDataSource {
  create(seatingArea: SeatingAreaModel): Promise<any>;
  getById(id: string): Promise<any | null>;
  getAllSeatingAreas(outletId: string): Promise<any[]>;
  update(id: string, seatingArea: SeatingAreaModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class SeatingAreaDataSourceImpl implements SeatingAreaDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(seatingArea: SeatingAreaModel): Promise<any> {
    const existingSeatingArea = await SeatingArea.findOne({
      outletId: seatingArea.outletId,
      $or: [
        { seatingAreaName: seatingArea.seatingAreaName },
        { listOrder: seatingArea.listOrder },
      ],
    });

    // if (existingSeatingArea) {
    //   throw ApiError.dataExists();
    // }
    
    if (existingSeatingArea) {
      if (existingSeatingArea.seatingAreaName === seatingArea.seatingAreaName) {
        throw ApiError.customError(
          HttpStatus.CONFLICT,
          "Seating Area with the same name already exists"
        );
      } else {
        throw ApiError.customError(
          HttpStatus.CONFLICT,
          "Seatirng Area with the same list order already exists"
        );
      }
    }

    const seatingAreaData = new SeatingArea(seatingArea);

    const createdSeatingArea = await seatingAreaData.save();

    return createdSeatingArea.toObject();
  }

  async getById(id: string): Promise<any | null> {
    const seatingArea = await SeatingArea.findById(id).populate({
      path: "tables",
      select: "id tableNo partySizeMini partySizeMax",
    });
    if (!seatingArea) {
      throw ApiError.notFound();
    }
    return seatingArea ? seatingArea.toObject() : null;
  }

  async getAllSeatingAreas(outletId: string): Promise<any[]> {
    const seatingAreas = await SeatingArea.find({
      outletId: outletId,
    }).populate({
      path: "tables",
      select: "id tableNo partySizeMini partySizeMax",
    });
    return seatingAreas.map((seatingArea) => seatingArea.toObject());
  }

  async update(id: string, seatingArea: SeatingAreaModel): Promise<any> {
    const updatedSeatingArea = await SeatingArea.findByIdAndUpdate(
      id,
      seatingArea,
      {
        new: true,
      }
    );
    return updatedSeatingArea ? updatedSeatingArea.toObject() : null;
  }

  async delete(id: string): Promise<void> {
    await SeatingArea.findByIdAndDelete(id);
  }
}
