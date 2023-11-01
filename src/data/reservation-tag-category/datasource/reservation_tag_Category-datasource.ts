import mongoose from "mongoose";
import { ReservationTagCategoryModel } from "@domain/reservation-tag-category/entities/reservation_tag_category_entities";
import { ReservationTagCategory } from "../models/reservation_tag_category_model";
import ApiError from "@presentation/error-handling/api-error";

export interface ReservationTagCategoryDataSource {
  create(reservationTagCategory: ReservationTagCategoryModel): Promise<any>;
  update(
    id: string,
    reservationTagCategory: ReservationTagCategoryModel
  ): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAll(outletId:string): Promise<any[]>;
}

export class ReservationTagCategoryDataSourceImpl
  implements ReservationTagCategoryDataSource
{
  constructor(private db: mongoose.Connection) {}

  async create(
    reservationTagCategory: ReservationTagCategoryModel
  ): Promise<any> {
    try {
      const existingReservationTagCategory =
        await ReservationTagCategory.findOne({
          name: reservationTagCategory.name,
        }).populate({
          path: "tags",
          select: "id name",
        });
      if (existingReservationTagCategory) {
        throw ApiError.emailExist();
      }
      const reservationTagCategoryData = new ReservationTagCategory(
        reservationTagCategory
      );
      const createdReservationTagCategory =
        await reservationTagCategoryData.save();
      return createdReservationTagCategory.toObject();
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await ReservationTagCategory.findByIdAndDelete(id);
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async read(id: string): Promise<any | null> {
    try {
      const reservationTagCategory = await ReservationTagCategory.findById(
        id
      ).populate({
        path: "tags",
        select: "id name",
      });
      return reservationTagCategory ? reservationTagCategory.toObject() : null;
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async getAll(outletId:string): Promise<any[]> {
    try {
      const reservationTagCategories =
        await ReservationTagCategory.find({outletId:outletId}).populate({
          path: "tags",
          select: "id name",
        });
      return reservationTagCategories.map((reservationTagCategory) =>
        reservationTagCategory.toObject()
      );
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async update(
    id: string,
    reservationTagCategory: ReservationTagCategoryModel
  ): Promise<any> {
    try {
      const updatedReservationTagCategory =
        await ReservationTagCategory.findByIdAndUpdate(
          id,
          reservationTagCategory,
          {
            new: true,
          }
        ).populate({
          path: "tags",
          select: "id name",
        });
      return updatedReservationTagCategory
        ? updatedReservationTagCategory.toObject()
        : null;
    } catch (error) {
      throw ApiError.badRequest();
    }
  }
}
