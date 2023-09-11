import mongoose from "mongoose";
import { BookedByName } from "../models/booked-by-names-model";
import ApiError from "@presentation/error-handling/api-error";
import { BookedByNameEntity, BookedByNameModel } from "@domain/booked-by-name/entities/booked-by-name";


export interface BookedByNameDataSource{
    createBookedByName(bookedByName: BookedByNameModel): Promise<any>; 
    getAllBookedByName(): Promise<any[]>;
    read(id:string):Promise<BookedByNameEntity>;
    updateName(id: string, name: BookedByNameModel): Promise<any>; // Return type should be Promise of AdminEntity
    delete(id: string): Promise<void>;

}

export class BookedByNameDataSourceImpl implements BookedByNameDataSource {
    constructor(private db: mongoose.Connection) {}

    async createBookedByName(bookedByName: BookedByNameModel): Promise<any> {
        const existingBookedByName = await BookedByName.findOne({ name: bookedByName.name });
        if (existingBookedByName) {
          throw ApiError.nameExist();
        }
    
        const bookedByNameData = new BookedByName(bookedByName);
    
        const createdBookedByName: mongoose.Document = await bookedByNameData.save();
    
        return createdBookedByName.toObject();
      }
    async getAllBookedByName(): Promise<any[]> {
        try {
          const bookedByNames = await BookedByName.find();
          return bookedByNames.map((name) => name.toObject()); // Convert to plain JavaScript objects before returning
        } catch (error) {
          throw ApiError.notFound();
        }
      }
      async read(id: string): Promise<any> {
        try {
          const name = await BookedByName.findById(id);
          if (!name) {
            throw ApiError.notFound();
          }
          return name && name.toObject(); // Convert to plain JavaScript object before returning
        } catch (error) {
          throw ApiError.badRequest();
        }
      }
      async updateName(id: string, name: BookedByNameModel): Promise<any> {
        try {
          const updatedName = await BookedByName.findByIdAndUpdate(id, name, {
            new: true,
          }); // No need for conversion here
          return updatedName ? updatedName.toObject() : null; // Convert to plain JavaScript object before returning
        } catch (error) {
          throw ApiError.badRequest();
        }
      }

    
      async delete(id: string): Promise<void> {
        await BookedByName.findByIdAndDelete(id);
      }
      
  

}