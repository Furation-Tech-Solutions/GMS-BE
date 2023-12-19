import mongoose from "mongoose";
import { GuestModel } from "@domain/guest/entities/guest_entities";
import { Guest } from "../models/guest_model";
import ApiError from "@presentation/error-handling/api-error";
import { formattedDateFunc } from "@presentation/utils/formatt-date";

export interface GuestDataSource {
  create(guest: GuestModel): Promise<any>;
  update(id: string, guest: GuestModel): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAllGuests(outletId: string): Promise<any[]>;
}

export class GuestDataSourceImpl implements GuestDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(guest: GuestModel): Promise<any> {
    // try {
    const existingGuest = await Guest.findOne({
      firstName: guest.firstName,
      lastName: guest.lastName,
      date: guest.date,
      outletId: guest.outletId,
    }).populate("bookedBy");

    if (existingGuest) {
      throw ApiError.guestExist();
    }
    const guestData = new Guest(guest);
    const createdGuest = await guestData.save();
    return createdGuest.toObject();
    // } catch (error) {
    //   throw ApiError.badRequest();
    // }
  }

  async delete(id: string): Promise<void> {
    // try {
    await Guest.findByIdAndDelete(id);
    // } catch (error) {
    //   throw ApiError.badRequest();
    // }
  }

  async read(id: string): Promise<any | null> {
    // try {
    const guest = await Guest.findById(id)
      .populate({
        path: "reservationTags", // Populate the reservationTags field
        select: "id name categoryNameId", // Adjust the fields you want to select
        populate: {
          path: "categoryNameId", // Populate the categoryNameId field in reservationTags
          select: "id name color",
          model: "ReservationTagCategory", // Reference to the Category model
        },
      })
      .populate("bookedBy");
    return guest ? guest.toObject() : null;
    // } catch (error) {
    //   throw ApiError.badRequest();
    // }
  }

  async getAllGuests(outletId: string): Promise<any[]> {
    try {
      const oneMonthPreviousDate = formattedDateFunc(new Date(), -1);

      const oldGuests = await Guest.find(
        { date: { $lt: oneMonthPreviousDate } },
        "_id"
      );
      // Fetching only the necessary _id field for deletion
      console.log(oldGuests);

      const guests = await Guest.find({ outletId: outletId })
        .populate({
          path: "reservationTags", // Populate the reservationTags field
          select: "id name categoryNameId", // Adjust the fields you want to select
          populate: {
            path: "categoryNameId", // Populate the categoryNameId field in reservationTags
            select: "id name color",
            model: "ReservationTagCategory", // Reference to the Category model
          },
        })
        .populate("bookedBy");
      return guests.map((guest) => guest.toObject());
    } catch (error) {
      throw ApiError.badRequest();
    }
  }

  async update(id: string, guest: GuestModel): Promise<any> {
    const updatedGuest = await Guest.findByIdAndUpdate(id, guest, {
      new: true,
    }).populate("bookedBy");

    return updatedGuest ? updatedGuest.toObject() : null;
  }
}
