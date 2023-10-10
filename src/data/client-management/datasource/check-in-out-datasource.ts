
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { CheckInCheckOutEntity, CheckInCheckOutModel } from "@domain/client-management/entities/check-in-out-entities";
import { CheckInCheckOut } from "../models/check-in-out-model";
import { AddReservation } from "@data/add-reservation/models/add-reservation-model";

export interface CheckInCheckOutDataSource {
  create(checkInCheckOut: string): Promise<any>;
  update(id: string, checkInCheckOut: CheckInCheckOutModel ): Promise<any>; 
  delete(id: string): Promise<void>;
  read(id: string): Promise<CheckInCheckOutEntity>; 
  getAllAdmins(): Promise<CheckInCheckOutEntity[]>; 
}

export class CheckInCheckOutSourceImpl implements CheckInCheckOutDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(checkInCheckOut: string): Promise<any> {

    const reservation = await AddReservation.findOne({_id: checkInCheckOut})

    const dateString = new Date();
    const dateObject = new Date(dateString);
    
    // Get hours, minutes, and seconds
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    // Format the time as HH:MM:SS
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if(!reservation)  throw ApiError.notFound()

    const newcheckInCheckOutData = {
      checkInTime: formattedTime
    }

    
    const checkInCheckOutData = new CheckInCheckOut(newcheckInCheckOutData);
    
    const createdCheckInCheckOutData: mongoose.Document = await checkInCheckOutData.save();

    return createdCheckInCheckOutData.toObject();
  }

  async update(id: string, checkInCheckOut: CheckInCheckOutModel): Promise<any> {

    const updatedData = await CheckInCheckOut.findByIdAndUpdate(id, checkInCheckOut, {
      new: true,
    }); // No need for conversion here
    return updatedData ? updatedData.toObject() : null;
     
  } 

  async delete(id: string): Promise<void> {
    await CheckInCheckOut.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any> {
    try {
      const checkInCheckOut = await CheckInCheckOut.findOne({
        $or: [
          { reservation: id }, 
          { _id: id }, 
        ],
      });


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
