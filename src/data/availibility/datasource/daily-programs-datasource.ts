
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { ProgramScheduleModel } from "@domain/availibility/entities/daily-program-entity";
import ProgramSchedule from "../models/daily-programs-model";


export interface ProgramScheduleDataSource {
  create(programData: ProgramScheduleModel): Promise<any>;
  update(id: string, shiftData: ProgramScheduleModel): Promise<any>;
  read(id: string): Promise<any>;
  delete(id: string): Promise<void>;
  getAll() : Promise<any[]>;
}

export class ProgramScheduleDataSourceImpl implements ProgramScheduleDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(programData: ProgramScheduleModel): Promise<any> {
    const newProgramData = new ProgramSchedule(programData);
    const savedProgramData: mongoose.Document = await newProgramData.save();
    return savedProgramData.toObject();
  }



  async update(id: string, programData: ProgramScheduleModel): Promise<any> {
    try {
      const updatedProgram = await ProgramSchedule.findByIdAndUpdate(id, programData, {
        new: true,
      }); // No need for conversion here
      return updatedProgram ? updatedProgram.toObject() : null; // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async read(id: string): Promise<any> {
    try {
      const programSchedule = await ProgramSchedule.findById(id);
      if (!programSchedule) {
        throw ApiError.notFound();
      }
      return programSchedule && programSchedule.toObject(); // Convert to plain JavaScript object before returning
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    await ProgramSchedule.findByIdAndDelete(id);
  }

  async getAll(): Promise<any[]> {
    try {
      const programSchedules = await ProgramSchedule.find();
      return programSchedules.map((programSchedule) => programSchedule.toObject()); // Convert to plain JavaScript objects before returning
    } catch (error) {
      throw ApiError.notFound();
    }
  }

}
