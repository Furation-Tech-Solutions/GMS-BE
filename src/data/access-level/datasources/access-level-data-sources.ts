import { AccessLevelModel } from "@domain/access-level/entities/access-level";
import mongoose from "mongoose";
import { AccessLevel } from "../models/access-level-model";
import ApiError from "@presentation/error-handling/api-error";


export interface AccessLevelDataSource {
    create(accessLevel: AccessLevelModel): Promise<any>;
}

export class AccessLevelSourceImpl implements AccessLevelDataSource {
    constructor(private db: mongoose.Connection) {}
  
    async create(accessLevel: AccessLevelModel): Promise<any> {
      const existingAccessLevel = await AccessLevel.findOne({ role: accessLevel.role });
      if (existingAccessLevel) {
        throw ApiError.roleExist();
      }
  
      const accessLevelData = new AccessLevel(accessLevel);
      
      // const createdAccessLevel: mongoose.Document = await accessLevelData.save();
      
      const createdAccessLevel = await accessLevelData.save();

      return createdAccessLevel.toObject();
  
     
    }
}