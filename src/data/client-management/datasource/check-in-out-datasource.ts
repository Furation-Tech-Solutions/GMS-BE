
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { CheckInCheckOutEntity, CheckInCheckOutModel } from "@domain/client-management/entities/check-in-out-entities";
import { CheckInCheckOut } from "../models/check-in-out-model";
import { AddReservation } from "@data/add-reservation/models/add-reservation-model";

export interface CheckInCheckOutDataSource {
  create(checkInCheckOut: string): Promise<any>;
  update(id: string, checkInCheckOut: CheckInCheckOutModel, action: string): Promise<any>; 
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

  async update(id: string, checkInCheckOut: CheckInCheckOutModel, action: string): Promise<any> {

      const existingCheckInCheckOut = await CheckInCheckOut.findOne({resrvation: id});

      if(!existingCheckInCheckOut) throw ApiError.notFound();

      const dateString = new Date();
      const dateObject = new Date(dateString);
      
      // Get hours, minutes, and seconds
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      const seconds = dateObject.getSeconds();

      // Format the time as HH:MM:SS
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  
      if(action === "arrived"){
        const newcheckInCheckOutData = {
          checkInTime: formattedTime
        }

        const updatedCheckInCheckOut = await CheckInCheckOut.findByIdAndUpdate(existingCheckInCheckOut._id, newcheckInCheckOutData, {
          new: true,
        });


        return updatedCheckInCheckOut ? updatedCheckInCheckOut.toObject() : null; 

      }else if (action === "left"){
        const newcheckInCheckOutData = {
          checkOutTime: formattedTime
        }
        const updatedCheckInCheckOut = await CheckInCheckOut.findByIdAndUpdate(existingCheckInCheckOut._id, newcheckInCheckOutData, {
          new: true,
        });

        return updatedCheckInCheckOut ? updatedCheckInCheckOut.toObject() : null; // Convert to plain JavaScript object before returning
      }
     
  } 

  async delete(id: string): Promise<void> {
    await CheckInCheckOut.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any> {
    try {
      const checkInCheckOut = await AddReservation.findById(id);

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
