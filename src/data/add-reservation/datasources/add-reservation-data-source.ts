import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { AddReservationModel } from "@domain/add-reservation/entities/add-reservation";
import { AddReservation } from "../models/add-reservation-model";

export interface AddReservationDataSource {
  create(addReservation: AddReservationModel): Promise<any>;
  update(id: string, addReservation: AddReservationModel): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAll(): Promise<any[]>;
}

export class AddReservationDataSourceImpl implements AddReservationDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(addReservation: AddReservationModel): Promise<any> {
    try {
      const existingAddReservation = await AddReservation.findOne({
        date: addReservation.date,
        shift: addReservation.shift,
        client: addReservation.client,
      });
      if (existingAddReservation) {
        throw ApiError.emailExist();
      }
      const addReservationData = new AddReservation(addReservation);

      const createdAddReservation = await addReservationData.save();
      return createdAddReservation.toObject();
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await AddReservation.findByIdAndDelete(id);
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async read(id: string): Promise<any | null> {
    try {
      const addReservation = await AddReservation.findById(id);
      return addReservation ? addReservation.toObject() : null;
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async getAll(): Promise<any[]> {
    try {
      const addReservations = await AddReservation.find();
      return addReservations.map((addReservation) => addReservation.toObject());
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async update(id: string, addReservation: AddReservationModel): Promise<any> {
    try {
      const updatedAddReservation = await AddReservation.findByIdAndUpdate(
        id,
        addReservation,
        {
          new: true,
        }
      );
      return updatedAddReservation ? updatedAddReservation.toObject() : null;
    } catch (error) {
      throw ApiError.badRequest();
    }
  }
}