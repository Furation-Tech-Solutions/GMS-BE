
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { BlackoutDayModel } from "@domain/availibility/entities/black-out-day-entity";
import BlackoutDay from "../models/black-out-day-model";



export interface BlackoutDayDataSource {
  create(blackoutDayData: BlackoutDayModel): Promise<any>;
  update(id: string, blackoutDayData: BlackoutDayModel): Promise<any>;
  read(id: string): Promise<any>;
  delete(id: string): Promise<void>;
  getAll() : Promise<any[]>;
}

export class BlackoutDayDataSourceImpl implements BlackoutDayDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(blackoutDayData: BlackoutDayModel): Promise<any> {
    const newBlackoutDayData = new BlackoutDay(blackoutDayData);
    const savedBlackoutDayDataData: mongoose.Document = await newBlackoutDayData.save();
    return savedBlackoutDayDataData.toObject();
  }



  async update(id: string, blackoutDayData: BlackoutDayModel): Promise<any> {
    try {
      const updatedBlackoutDay = await BlackoutDay.findByIdAndUpdate(id, blackoutDayData, {
        new: true,
      }); // No need for conversion here
      return updatedBlackoutDay ? updatedBlackoutDay.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async read(id: string): Promise<any> {
    try {
      const blackoutDay = await BlackoutDay.findById(id);
      if (!blackoutDay) {
        throw ApiError.notFound();
      }
      return blackoutDay && blackoutDay.toObject(); // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await BlackoutDay.findByIdAndDelete(id);
  }

  async getAll(): Promise<any[]> {
    try {
      const blackoutDays = await BlackoutDay.find();
      return blackoutDays.map((blackoutDay) => blackoutDay.toObject()); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

}
