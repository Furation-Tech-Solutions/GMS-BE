
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { CheckInCheckOutEntity, CheckInCheckOutModel } from "@domain/client-management/entities/check-in-out-entities";
import { CheckInCheckOut } from "../models/check-in-out-model";
import { AddReservation } from "@data/add-reservation/models/add-reservation-model";

export interface CheckInCheckOutDataSource {
  create(checkInCheckOut: string): Promise<any>;
  update(id: string, checkInCheckOut: CheckInCheckOutModel): Promise<any>; 
  delete(id: string): Promise<void>;
  read(id: string): Promise<CheckInCheckOutEntity>; 
  getAllAdmins(): Promise<CheckInCheckOutEntity[]>; 
}

export class CheckInCheckOutSourceImpl implements CheckInCheckOutDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(checkInCheckOut: string): Promise<any> {

    const reservation = await AddReservation.findOne({_id: checkInCheckOut})

    const newcheckInCheckOutData = {
      client: reservation?.client,
      checkInTime: new Date()
    }

    console.log(newcheckInCheckOutData);

    // const checkInCheckOutData = new CheckInCheckOut(checkInCheckOut);
    
    // const createdCheckInCheckOutData: mongoose.Document = await checkInCheckOutData.save();

    // return createdCheckInCheckOutData.toObject();
  }

  async update(id: string, checkInCheckOut: CheckInCheckOutModel): Promise<any> {
    try {
      const updatedCheckInCheckOut = await CheckInCheckOut.findByIdAndUpdate(id, checkInCheckOut, {
        new: true,
      }); // No need for conversion here
      return updatedCheckInCheckOut ? updatedCheckInCheckOut.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await CheckInCheckOut.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any> {
    try {
      const checkInCheckOut = await CheckInCheckOut.findById(id);

      if (!checkInCheckOut) {
        throw ApiError.notFound();
      }
      return checkInCheckOut && checkInCheckOut.toObject(); // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async getAllAdmins(): Promise<any[]> {
    try {
      const checkInCheckOut = await CheckInCheckOut.find();
      return checkInCheckOut.map((checkInCheckOut) => checkInCheckOut.toObject()); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }
}
