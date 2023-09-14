import mongoose from "mongoose";
import { ClientTagCategoryModel } from "@domain/client-tag-category/entities/client_tag_category_entities";
import { ClientTagCategory } from "../models/client_tag_category_model";
import ApiError from "@presentation/error-handling/api-error";

export interface ClientTagCategoryDataSource {
    create(clientTagCategory: ClientTagCategoryModel): Promise<any>;
    update(id: string, tagCategory: ClientTagCategoryModel): Promise<any>;
    delete(id: string): Promise<void>;
    read(id: string): Promise<any | null>;
    getAll(): Promise<any[]>;
}

export class ClientTagCategoryDataSourceImpl implements ClientTagCategoryDataSource {
    constructor(private db: mongoose.Connection) { }

    async create(clientTagCategory: ClientTagCategoryModel): Promise<any> {
        try {
            const existingClientTagCategory = await ClientTagCategory.findOne({ name: clientTagCategory.name });
            if (existingClientTagCategory) {
                throw ApiError.clienttagExist();
            }
            const clientTagCategoryData = new ClientTagCategory(clientTagCategory);
            const createdClientTagCategory = await clientTagCategoryData.save();
            return createdClientTagCategory.toObject();
        } catch (error) {
            throw ApiError.badRequest();
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await ClientTagCategory.findByIdAndDelete(id);
        } catch (error) {
            throw ApiError.badRequest();
        }
    }

    async read(id: string): Promise<any | null> {
        try {
            const clientTagCategory = await ClientTagCategory.findById(id);
            return clientTagCategory ? clientTagCategory.toObject() : null;
        } catch (error) {
            throw ApiError.badRequest();
        }
    }

    async getAll(): Promise<any[]> {
        try {
            const clientTagCategories = await ClientTagCategory.find();
            return clientTagCategories.map((clientTagCategory) => clientTagCategory.toObject());
        } catch (error) {
            throw ApiError.badRequest();
        }
    }

    async update(id: string, clientTagCategory: ClientTagCategoryModel): Promise<any> {
        try {
            const updatedClientTagCategory = await ClientTagCategory.findByIdAndUpdate(id, clientTagCategory, {
                new: true,
            });
            return updatedClientTagCategory ? updatedClientTagCategory.toObject() : null;
        } catch (error) {
            throw ApiError.badRequest();
        }
    }
}
