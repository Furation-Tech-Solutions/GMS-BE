import mongoose from "mongoose";
import { ClientTagCategoryModel } from "@domain/client-tag-category/entities/client_tag_category_entities"; // Import the TagCategoryModel
import { ClientTagCategory } from "../models/client_tag_category_model";
import ApiError from "@presentation/error-handling/api-error";

// Create CLientTagCategoryDataSource Interface
export interface ClientTagCategoryDataSource {
  create(clientTagCategory: ClientTagCategoryModel): Promise<any>;
  update(id: string, tagCategory: ClientTagCategoryModel): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAll(outletId: string): Promise<any[]>;
}

// TagCategory Data Source communicates with the database
export class ClientTagCategoryDataSourceImpl
  implements ClientTagCategoryDataSource
{
  constructor(private db: mongoose.Connection) {}

  async create(clientTagCategory: ClientTagCategoryModel): Promise<any> {
    const existingClientTagCategory = await ClientTagCategory.findOne({
      name: clientTagCategory.name,
      outletId: clientTagCategory.outletId,
    });
    if (existingClientTagCategory) {
      throw ApiError.clienttagExist();
    }
    const clientTagCategoryData = new ClientTagCategory(clientTagCategory);
    const createdClientTagCategory = await clientTagCategoryData.save();
    return createdClientTagCategory.toObject();
  }

  async delete(id: string): Promise<void> {
    await ClientTagCategory.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const clientTagCategory = await ClientTagCategory.findById(id).populate({
      path: "tags",
      select: "id name",
    });
    //   .populate("tags");
    return clientTagCategory ? clientTagCategory.toObject() : null; // Convert to a plain JavaScript object before returning
  }

  async getAll(outletId: string): Promise<any[]> {
    const clientTagCategories = await ClientTagCategory.find({
      outletId: outletId,
    }).populate({
      path: "tags",
      select: "id name",
    });
    //   .populate("tags");
    return clientTagCategories.map((clientTagCategory) =>
      clientTagCategory.toObject()
    ); // Convert to plain JavaScript objects before returning
  }

  async update(
    id: string,
    clientTagCategory: ClientTagCategoryModel
  ): Promise<any> {
    const updatedClientTagCategory = await ClientTagCategory.findByIdAndUpdate(
      id,
      clientTagCategory,
      {
        new: true,
      }
    );
    return updatedClientTagCategory
      ? updatedClientTagCategory.toObject()
      : null; // Convert to a plain JavaScript object before returning
  }
}
