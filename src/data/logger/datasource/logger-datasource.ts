import mongoose from "mongoose";

import ApiError from "@presentation/error-handling/api-error";
import { LogModel } from "../models/logger-model";
import { LoggerModel } from "@domain/logger/entities/logger-entity";
import { IlogsFilter } from "types/logger/logger-schema-type";

// Create CLientTagCategoryDataSource Interface
export interface LoggerDataSource {
  create(loggerData: LoggerModel): Promise<any>;
  getAll(filter: IlogsFilter): Promise<any[]>;
} 


// TagCategory Data Source communicates with the database
export class LoggerDataSourceImpl
  implements LoggerDataSource
{
  constructor(private db: mongoose.Connection) {}

  async create(loggerData: LoggerModel): Promise<any> {

    const clientTagCategoryData = new LogModel(loggerData);
    const createdClientTagCategory = await clientTagCategoryData.save();
    return createdClientTagCategory.toObject();
  }


  async getAll(filter: IlogsFilter): Promise<any[]> {
    const getAllLogs = await LogModel.find(filter);
    return getAllLogs.map((logs) => logs.toObject() );
  }
}
