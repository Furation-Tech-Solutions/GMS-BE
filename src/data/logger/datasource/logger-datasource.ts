import mongoose from "mongoose";

import ApiError from "@presentation/error-handling/api-error";
import { LogModel } from "../models/logger-model";

// Create CLientTagCategoryDataSource Interface
export interface LoggerDataSource {
  create(loggerData): Promise<any>;
//   update(id: string, tagCategory: LoggerModel): Promise<any>;
//   delete(id: string): Promise<void>;
//   read(id: string): Promise<any | null>;
//   getAll(loggerid: string): Promise<any[]>;
}

// TagCategory Data Source communicates with the database
export class LoggerDataSourceImpl
  implements LoggerDataSource
{
  constructor(private db: mongoose.Connection) {}

  async create(loggerData): Promise<any> {

    const clientTagCategoryData = new LogModel(loggerData);
    const createdClientTagCategory = await clientTagCategoryData.save();
    return createdClientTagCategory.toObject();
  }

//   async delete(id: string): Promise<void> {
//     await ClientTagCategory.findByIdAndDelete(id);
//   }

//   async read(id: string): Promise<any | null> {
//     const clientTagCategory = await ClientTagCategory.findById(id).populate({
//       path: "tags",
//       select: "id name",
//     });
//     //   .populate("tags");
//     return clientTagCategory ? clientTagCategory.toObject() : null; // Convert to a plain JavaScript object before returning
//   }

//   async getAll(outletId: string): Promise<any[]> {
//     const clientTagCategories = await ClientTagCategory.find({
//       outletId: outletId,
//     }).populate({
//       path: "tags",
//       select: "id name",
//     });
//     //   .populate("tags");
//     return clientTagCategories.map((clientTagCategory) =>
//       clientTagCategory.toObject()
//     ); // Convert to plain JavaScript objects before returning
//   }

//   async update(
//     id: string,
//     clientTagCategory: ClientTagCategoryModel
//   ): Promise<any> {
//     const updatedClientTagCategory = await ClientTagCategory.findByIdAndUpdate(
//       id,
//       clientTagCategory,
//       {
//         new: true,
//       }
//     );
//     return updatedClientTagCategory
//       ? updatedClientTagCategory.toObject()
//       : null; // Convert to a plain JavaScript object before returning
//   }
}
