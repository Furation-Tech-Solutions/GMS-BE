import { AccessLevelModel } from "@domain/access-level/entities/access-level";
import mongoose from "mongoose";
import { AccessLevel } from "../models/access-level-model";
import ApiError from "@presentation/error-handling/api-error";


export interface AccessLevelDataSource {
    create(accessLevel: AccessLevelModel): Promise<any>;
    getAll():Promise<any[]>;
    delete(id: string): Promise<void>;
    read(id: string): Promise<any | null>;
    update(id: String, accessLevelModel: AccessLevelModel): Promise<any>;
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
    async getAll():Promise<any[]>{
         try{
          const accessLevel=await AccessLevel.find()
          return accessLevel.map((accessLevel)=>accessLevel.toObject())

         }
         catch(err){
          throw ApiError.notFound()
         }

    }
    async delete(id:string):Promise<void>{
      try{
           await AccessLevel.findByIdAndDelete(id)
      }
      catch(err){
        throw ApiError.notFound()
      }
    }
    async read(id: string): Promise<any | null> {
      try {
          const accessLevel = await AccessLevel.findById(id);
          return accessLevel ? accessLevel.toObject() : null;
      } catch (error) {
          throw ApiError.badRequest();
      } // Convert to a plain JavaScript object before returning
  }
  async update(id: string, accessLevel: AccessLevelModel): Promise<any> {
    try {
        const updatedAccessLevel = await AccessLevel.findByIdAndUpdate(id, accessLevel, {
            new: true,
        }); // No need for conversion here
        return updatedAccessLevel ? updatedAccessLevel.toObject() : null; // Convert to a plain JavaScript object before returning
    } catch (error) {
        throw ApiError.badRequest();
    }
}
}