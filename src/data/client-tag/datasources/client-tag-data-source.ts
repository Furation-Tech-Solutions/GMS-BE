import mongoose from "mongoose";
import { ClientTagModel } from "@domain/client-tag/entities/client-tag-entities"; // Import the TagCategoryModel
import { ClientTag } from "../models/client-tag-model";
import { ClientTagCategory } from "@data/client-tag-category/models/client_tag_category_model";

import ApiError from "@presentation/error-handling/api-error";

// Create ReservationTagDataSource Interface
export interface ClientTagDataSource {
  create(clientTag: ClientTagModel): Promise<any>;
  update(id: string, tagCategory: ClientTagModel): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAll(outletId: string): Promise<any[]>;
}

// Tag Data Source communicates with the database
export class ClientTagDataSourceImpl implements ClientTagDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(clientTag: ClientTagModel): Promise<any> {
    const existingClientTag = await ClientTag.findOne({ name: clientTag.name });
    if (existingClientTag) {
      throw ApiError.emailExist();
    }
    const clientTagData = new ClientTag(clientTag);

    const createdClientTag = await clientTagData.save();

    const ClientTagCategoryData: any | null = await ClientTagCategory.findOne({
      _id: clientTag.categoryNameId,
    });

    ClientTagCategoryData.tags.push(createdClientTag._id);

    const createdClientTagCategory = await ClientTagCategoryData.save();

    return createdClientTag.toObject();
  }

  async delete(id: string): Promise<void> {
    const clientTag: any | null = await ClientTag.findById(id);

    const ClientTagCategoryData: any | null = await ClientTagCategory.findOne({
      _id: clientTag.categoryNameId,
    });

    const index = ClientTagCategoryData.tags.indexOf(clientTag.categoryNameId);
    ClientTagCategoryData.tags.splice(index, 1);
    await ClientTagCategoryData.save();

    await ClientTag.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const clientTag = await ClientTag.findById(id).populate({
      path: "categoryNameId",
      select: "id name color",
    });
    return clientTag ? clientTag.toObject() : null; // Convert to a plain JavaScript object before returning
  }

  async getAll(outletId: string): Promise<any[]> {
    try {
      const clientTag = await ClientTag.find({ outletId: outletId }).populate({
        path: "categoryNameId",
        select: "id name color",
      });
      return clientTag.map((clienttag) => clienttag.toObject());
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async update(id: string, clientTag: ClientTagModel): Promise<any> {
    const updatedClientTag = await ClientTag.findByIdAndUpdate(id, clientTag, {
      new: true,
    }); // No need for conversion here
    return updatedClientTag ? updatedClientTag.toObject() : null; // Convert to a plain JavaScript object before returning
  }
}
