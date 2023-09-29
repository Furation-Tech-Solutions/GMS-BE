import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { AddReservationModel } from "@domain/add-reservation/entities/add-reservation";
import { AddReservation } from "../models/add-reservation-model";
import { Client } from "@data/client/models/client_model";
import { BookingRequest } from "@data/BookingRequest/models/bookingRequest-model";

export interface AddReservationDataSource {
  create(addReservation: AddReservationModel): Promise<any>;
  update(id: string, addReservation: AddReservationModel): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAll(): Promise<any[]>;
}

export class AddReservationDataSourceImpl implements AddReservationDataSource {
  constructor(private db: mongoose.Connection) { }

  async create(addReservation: AddReservationModel): Promise<any> {
    const clientExists = await Client.findById(addReservation.client);

    const bookingCheckCredetial = {
      firstName: clientExists?.firstName,
      lastName: clientExists?.lastName,
      email: clientExists?.email,
      reservationDate: addReservation.date,
      numberOfGuest: addReservation.noOfGuests,
    };

    const bookingRequiestExists = await BookingRequest.findOne(
      bookingCheckCredetial
    );

    const existingAddReservation = await AddReservation.findOne({
      date: addReservation.date,
      shift: addReservation.shift,
      client: addReservation.client,
    });

    if (existingAddReservation) throw ApiError.reservationExits();

    const addReservationData = new AddReservation(addReservation);
    const createdAddReservation = await addReservationData.save();

    if (bookingRequiestExists !== null) {
      bookingRequiestExists.status = { name: "Booked", color: "Green" };
      const updatedBookingRequest = await bookingRequiestExists.save();
    }

    return createdAddReservation.toObject();
  }

  async delete(id: string): Promise<void> {
    await AddReservation.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const addReservation = await AddReservation.findById(id)
      .populate({
        path: "shift",
        select: "id shiftName shiftCategory",
      })
      .populate({
        path: "client",
        select: "id firstName lastName phone email",
      })
      .populate({
        path: "table",
        select: "id tableNo",
      })
      .populate({
        path: "seatingArea",
        select: "id abbreviation seatingAreaName",
      })
      .populate({
        path: "reservationTags", // Populate the reservationTags field
        select: "id name categoryNameId", // Adjust the fields you want to select
        populate: {
          path: "categoryNameId", // Populate the categoryNameId field in reservationTags
          select: "id name color",
          model: "ReservationTagCategory", // Reference to the Category model
        },
      })
      .exec();

    return addReservation ? addReservation.toObject() : null;
  }

  async getAll(): Promise<any[]> {
    const addReservations = await AddReservation.find()
      .populate({
        path: "shift",
        select: "id shiftName shiftCategory",
      })
      .populate({
        path: "client",
        select: "id firstName lastName phone email",
      })
      .populate({
        path: "table",
        select: "id tableNo",
      })
      .populate({
        path: "seatingArea",
        select: "id abbreviation seatingAreaName",
      })
      .populate({
        path: "reservationTags", // Populate the reservationTags field
        select: "id name categoryNameId", // Adjust the fields you want to select
        populate: {
          path: "categoryNameId", // Populate the categoryNameId field in reservationTags
          select: "id name color",
          model: "ReservationTagCategory", // Reference to the Category model
        },
      })
      .exec();

    return addReservations.map((addReservation) => addReservation.toObject());
  }

  async update(id: string, addReservation: AddReservationModel): Promise<any> {
    const updatedAddReservation = await AddReservation.findByIdAndUpdate(
      id,
      addReservation,
      {
        new: true,
      }
    );

    return updatedAddReservation ? updatedAddReservation.toObject() : null;
  }
}
