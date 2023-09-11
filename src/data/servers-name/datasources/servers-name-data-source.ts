import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { BookedByNameEntity, BookedByNameModel } from "@domain/booked-by-name/entities/booked-by-name";
import { ServersNameEntity, ServersNameModel } from "@domain/servers-name/entities/servers-name";
import { ServersName } from "../models/servers-name-model";


export interface ServersNameDataSource{
    createServerName(serverName: ServersNameModel): Promise<any>; 
    getAllServersName(): Promise<any[]>;
    getServerNameById(id:string):Promise<ServersNameEntity>;
    updateServerName(id: string, name: ServersNameModel): Promise<any>; // Return type should be Promise of AdminEntity
    deleteServerName(id: string): Promise<void>;

}

export class ServersNameDataSourceImpl implements ServersNameDataSource {
    constructor(private db: mongoose.Connection) {}

    async createServerName(serverName: ServersNameModel): Promise<any> {
        const existingServerName = await ServersName.findOne({ server_name: serverName.server_name });
        if (existingServerName) {
          throw ApiError.nameExist();
        }
    
        const serverNameData = new ServersName(serverName);
    
        const createdServerName: mongoose.Document = await serverNameData.save();
    
        return createdServerName.toObject();
      }
    async getAllServersName(): Promise<any[]> {
        try {
          const serverNames = await ServersName.find();
        //   below line check sernername is correct
          return serverNames.map((servername) => servername.toObject()); // Convert to plain JavaScript objects before returning
        } catch (error) {
          throw ApiError.notFound();
        }
      }
      async getServerNameById(id: string): Promise<any> {
        try {
          const serverName = await ServersName.findById(id);
          if (!serverName) {
            throw ApiError.notFound();
          }
          return serverName && serverName.toObject(); // Convert to plain JavaScript object before returning
        } catch (error) {
          throw ApiError.badRequest();
        }
      }
      async updateServerName(id: string, name: ServersNameModel): Promise<any> {
        try {
          const updatedServerName = await ServersName.findByIdAndUpdate(id, name, {
            new: true,
          }); // No need for conversion here
          return updatedServerName ? updatedServerName.toObject() : null; // Convert to plain JavaScript object before returning
        } catch (error) {
          throw ApiError.badRequest();
        }
      }

    
      async deleteServerName(id: string): Promise<void> {
        await ServersName.findByIdAndDelete(id);
      }
      
  

}