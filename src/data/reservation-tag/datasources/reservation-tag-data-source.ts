import mongoose from "mongoose";
import { ReservationTagModel } from "@domain/reservation-tag/entities/reservation-tag-entities"; // Import the TagCategoryModel
import { ReservationTag } from "../models/reservation-tag-model";
import { ReservationTagCategory } from "@data/reservation-tag-category/models/reservation_tag_category_model";

import ApiError from "@presentation/error-handling/api-error";

// Create ReservationTagDataSource Interface
export interface ReservationTagDataSource {
    create(clientTag: ReservationTagModel): Promise<any>;
    update(id: string, tagCategory: ReservationTagModel): Promise<any>;
    delete(id: string): Promise<void>;
    read(id: string): Promise<any | null>;
    getAll(): Promise<any[]>;
}

// Tag Data Source communicates with the database
export class ReservationTagDataSourceImpl implements ReservationTagDataSource {
    constructor(private db: mongoose.Connection) { }

    async create(reservationTag: ReservationTagModel): Promise<any> {
        const existingReservationTag = await ReservationTag.findOne({ name: reservationTag.name });
        if (existingReservationTag) {
            throw ApiError.emailExist();
        }
        const reservationTagData = new ReservationTag(reservationTag);

        const createdReservationTag = await reservationTagData.save();

        const ReservationTagCategoryData: any | null = await ReservationTagCategory.findOne({ _id: reservationTag.categoryNameId });

        ReservationTagCategoryData.tags.push(createdReservationTag._id);

        const createdreservationTagCategory = await ReservationTagCategoryData.save();

        return createdReservationTag.toObject();
    }

    async delete(id: string): Promise<void> {
        const reservationTag: any | null = await ReservationTag.findById(id);

        const ReservationTagCategoryData: any | null = await ReservationTagCategory.findOne({ _id: reservationTag.categoryNameId });

        const index = ReservationTagCategoryData.tags.indexOf(reservationTag.categoryNameId);
        ReservationTagCategoryData.tags.splice(index, 1);
        await ReservationTagCategoryData.save();

        await ReservationTag.findByIdAndDelete(id);

    }

    async read(id: string): Promise<any | null> {
        const reservationTag = await ReservationTag.findById(id);
        return reservationTag ? reservationTag.toObject() : null; // Convert to a plain JavaScript object before returning
    }

    async getAll(): Promise<any[]> {
        try {
            const reservationTag = await ReservationTag.find();
            return reservationTag.map((restag) =>
                restag.toObject()
            );
        } catch (error) {
            throw ApiError.badRequest();
        }
    }

    async update(id: string, reservationTag: ReservationTagModel): Promise<any> {
        const updatedReservationTag = await ReservationTag.findByIdAndUpdate(id, reservationTag, {
            new: true,
        }); // No need for conversion here
        return updatedReservationTag ? updatedReservationTag.toObject() : null; // Convert to a plain JavaScript object before returning
    }
}

