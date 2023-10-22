import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { AddReservationModel } from "@domain/add-reservation/entities/add-reservation";
import { AddReservation } from "../models/add-reservation-model";
import { Client } from "@data/client/models/client_model";
import { BookingRequest } from "@data/BookingRequest/models/bookingRequest-model";
import { CheckInCheckOut } from "@data/client-management/models/check-in-out-model";
import { IRFilter, Icron } from "types/add-reservation-filter.ts/filter-type";
import { Table } from "@data/table/models/table-model";

export interface AddReservationDataSource {
  create(addReservation: AddReservationModel): Promise<any>;
  update(id: string, addReservation: AddReservationModel): Promise<any>;
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>;
  getAll(filter: IRFilter): Promise<any[]>;
  checkTableAvability(
    id: string,
    reservationDetail: AddReservationModel
  ): Promise<any>;
}

export class AddReservationDataSourceImpl implements AddReservationDataSource {
  constructor(private db: mongoose.Connection) {}

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

    const newAddReservation = {
      ...addReservation,
      date: addReservation.date.slice(0, 10),
    };
    const addReservationData = new AddReservation(newAddReservation);
    const createdAddReservation = await addReservationData.save();

    const checkInCheckOutObject = {
      reservation: createdAddReservation._id,
      client: createdAddReservation.client,
    };

    const checkInCheckOutData = new CheckInCheckOut(checkInCheckOutObject);

    const createdCheckInCheckOutData: mongoose.Document =
      await checkInCheckOutData.save();

    if (bookingRequiestExists !== null) {
      bookingRequiestExists.status = { name: "Booked", color: "Green" };
      const updatedBookingRequest = await bookingRequiestExists.save();
    }

    return createdAddReservation.toObject();
  }

  async delete(id: string): Promise<void> {
    await CheckInCheckOut.findOneAndDelete({
      reservation: id,
    });

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
        select: "id tableNo partySizeMini partySizeMax",
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

  async getAll(filter: IRFilter | Icron): Promise<any[]> {

    const addReservations = await AddReservation.find(filter)
      .populate({
        path: "shift",
        select:
          "id shiftName shiftCategory startDate endDate firstSeating lastSeating timeInterval",
      })
      .populate({
        path: "client",
        select: "id firstName lastName phone email",
      })
      .populate({
        path: "table",
        select: "id tableNo partySizeMini partySizeMax",
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
    const existResevation = await AddReservation.findById(id);
    const existingCheckInCheckOut = await CheckInCheckOut.findOne({
      reservation: id,
    });
    const existClient = await Client.findOne({ _id: existResevation?.client });
    const options = { timeZone: "Asia/Kolkata" };
    const currentDate = new Date().toLocaleString("en-US", options);
    const date = new Date(currentDate);
    const dateObject = new Date(date);

    // Get hours, minutes, and seconds
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    // Format the time as HH:MM:SS
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (
      existResevation?.reservationStatus !== "arrived" &&
      existResevation?.reservationStatus !== "left" &&
      addReservation.reservationStatus === "arrived"
    ) {
      const newCheckInData = {
        checkInTime: formattedTime,
      };

      const updatedCheckInCheckOut = await CheckInCheckOut.findByIdAndUpdate(
        existingCheckInCheckOut?._id,
        newCheckInData,
        {
          new: true,
        }
      );
    }
    if (
      existResevation?.reservationStatus !== "left" &&
      addReservation.reservationStatus === "left"
    ) {
      const newCheckOutData = {
        checkOutTime: formattedTime,
      };

      // Increase the visits of the client
      if (existClient) {
        existClient.visits = existClient.visits + 1; // Increment visits
        await existClient.save(); // Save the changes
      }

      const updatedCheckInCheckOut = await CheckInCheckOut.findByIdAndUpdate(
        existingCheckInCheckOut?._id,
        newCheckOutData,
        {
          new: true,
        }
      );
    }

    if (
      existResevation?.reservationStatus !== "cencel" &&
      addReservation.reservationStatus === "cencel"
    ) {
      // Increase the visits of the client
      if (existClient) {
        existClient.reservationCencel = existClient.reservationCencel + 1; // Increment visits
        await existClient.save(); // Save the changes
      }
    }
    const updatedAddReservation = await AddReservation.findByIdAndUpdate(
      id,
      addReservation,
      {
        new: true,
      }
    );

    return updatedAddReservation ? updatedAddReservation.toObject() : null;
  }

  async checkTableAvability(
    tableId: string,
    reservationData: AddReservationModel
  ): Promise<any> {
    const getAllReservationsByTableIDAndDate = await AddReservation.find({
      table: tableId,
      date: reservationData.date,
    });

    // console.log("datasource====>", { tableId, reservationData });
    // const bookTbleForDate = getAllReservationsByTableID.filter(
    //   (reservation) => {
    //     return reservation.date === reservationData.date;
    //   }
    // );


    return getAllReservationsByTableIDAndDate.map((reservation) =>
      reservation.toObject()
    );
  }
}
