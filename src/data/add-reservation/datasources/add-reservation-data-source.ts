// Import necessary packages and modules
import mongoose from "mongoose"; // MongoDB ORM
import ApiError from "@presentation/error-handling/api-error"; // Custom API error handler
import { AddReservationModel } from "@domain/add-reservation/entities/add-reservation"; // Model for adding reservations
import { AddReservation } from "../models/add-reservation-model"; // Mongoose model for AddReservation
import { Client } from "@data/client/models/client_model"; // Mongoose model for Client
import { BookingRequest } from "@data/BookingRequest/models/bookingRequest-model"; // Mongoose model for BookingRequest
import { CheckInCheckOut } from "@data/client-management/models/check-in-out-model"; // Mongoose model for CheckInCheckOut
import { IRFilter, Icron } from "types/add-reservation-filter.ts/filter-type"; // Custom types/interfaces
import logger from "@presentation/logger"; // Logger for logging
import { logTime } from "@presentation/utils/logs-time-format"; // Utility for time formatting
import { loggerService } from "@presentation/routes/logger-routes"; // Logger service for routes

// Define the interface for the data source
export interface AddReservationDataSource {
  // Methods for CRUD operations for reservations
  create(addReservation: AddReservationModel): Promise<any>; // Create a reservation
  update(id: string, addReservation: AddReservationModel): Promise<any>; // Update a reservation
  delete(id: string): Promise<void>; // Delete a reservation
  read(id: string): Promise<any | null>; // Read a reservation by ID
  getAll(filter: IRFilter): Promise<any[]>; // Get all reservations based on a filter
  checkTableAvability(
    id: string,
    reservationDetail: AddReservationModel
  ): Promise<any>; // Check table availability for a reservation
}

// Implementation of the data source interface
export class AddReservationDataSourceImpl implements AddReservationDataSource {
  constructor(private db: mongoose.Connection) {} // Constructor accepting a MongoDB connection

  async create(addReservation: AddReservationModel): Promise<any> {
    // Check if the client exists in the Client collection based on the provided client ID in the reservation
    const clientExists = await Client.findById(addReservation.client);

    // Prepare data for checking existing booking request with client details and reservation date
    const bookingCheckCredetial = {
      firstName: clientExists?.firstName,
      lastName: clientExists?.lastName,
      email: clientExists?.email,
      reservationDate: addReservation.date,
      numberOfGuest: addReservation.noOfGuests,
    };

    // Check if a booking request already exists with the same client details and reservation date
    const bookingRequiestExists = await BookingRequest.findOne(
      bookingCheckCredetial
    );

    // Check if a reservation already exists for the given date, shift, client, and outlet ID
    const existingAddReservation = await AddReservation.findOne({
      date: addReservation.date,
      shift: addReservation.shift,
      client: addReservation.client,
      outletId: addReservation.outletId,
    });

    // Throw an error if a reservation with similar details already exists
    if (existingAddReservation) throw ApiError.reservationExits();

    // Format the reservation date before saving to the database
    const newAddReservation = {
      ...addReservation,
      date: addReservation.date.slice(0, 10), // Extracting date in 'YYYY-MM-DD' format
    };

    // Create a new instance of AddReservation using the formatted data
    const addReservationData = new AddReservation(newAddReservation);

    // Save the newly created reservation in the database
    const createdAddReservation = await addReservationData.save();

    // Create a check-in/check-out record associated with the newly created reservation
    const checkInCheckOutObject = {
      reservation: createdAddReservation._id,
      client: createdAddReservation.client,
      outletId: createdAddReservation.outletId,
    };

    const checkInCheckOutData = new CheckInCheckOut(checkInCheckOutObject);

    const createdCheckInCheckOutData: mongoose.Document =
      await checkInCheckOutData.save();

    // Update the status of the existing booking request if it exists to 'Booked' with a green color
    if (bookingRequiestExists !== null) {
      bookingRequiestExists.status = { name: "Booked", color: "Green" };
      const updatedBookingRequest = await bookingRequiestExists.save();
    }

    // Return the newly created reservation object as a plain JavaScript object
    return createdAddReservation.toObject();
  }

  async delete(id: string): Promise<void> {
    // Find and delete the CheckInCheckOut record associated with the given reservation ID
    await CheckInCheckOut.findOneAndDelete({
      reservation: id,
    });

    // Find and delete the reservation using the provided ID
    await AddReservation.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    // Find a reservation document by its unique ID and populate its related fields
    const addReservation = await AddReservation.findById(id)
      .populate({
        path: "shift", // Populate the 'shift' field
        select: "id shiftName shiftCategory", // Select specific fields
      })
      .populate({
        path: "client", // Populate the 'client' field
        select: "id firstName lastName phone email", // Select specific fields
      })
      .populate({
        path: "table", // Populate the 'table' field
        select: "id tableNo partySizeMini partySizeMax tableCombinations", // Select specific fields
      })
      .populate({
        path: "seatingArea", // Populate the 'seatingArea' field
        select: "id abbreviation seatingAreaName", // Select specific fields
      })
      .populate({
        path: "reservationTags", // Populate the 'reservationTags' field
        select: "id name categoryNameId", // Select specific fields
        populate: {
          path: "categoryNameId", // Populate the 'categoryNameId' field within 'reservationTags'
          select: "id name color", // Select specific fields
          model: "ReservationTagCategory", // Reference to the Category model
        },
      })
      .exec(); // Execute the query

    // Check if a reservation document was found, if so, convert it to a plain JavaScript object, otherwise return null
    return addReservation ? addReservation.toObject() : null;
  }

  async getAll(filter: IRFilter | Icron): Promise<any[]> {
    // Find all reservation documents based on the provided filter and populate their related fields
    const addReservations = await AddReservation.find(filter)
      .populate({
        path: "shift", // Populate the 'shift' field
        select:
          "id shiftName shiftCategory startDate endDate firstSeating lastSeating timeInterval", // Select specific fields
      })
      .populate({
        path: "client", // Populate the 'client' field
        select: "id salutation firstName lastName phone email gender isClient", // Select specific fields
      })
      .populate({
        path: "table", // Populate the 'table' field
        select: "id tableNo partySizeMini partySizeMax", // Select specific fields
      })
      .populate({
        path: "seatingArea", // Populate the 'seatingArea' field
        select: "id abbreviation seatingAreaName", // Select specific fields
      })
      .populate({
        path: "reservationTags", // Populate the 'reservationTags' field
        select: "id name categoryNameId", // Select specific fields
        populate: {
          path: "categoryNameId", // Populate the 'categoryNameId' field within 'reservationTags'
          select: "id name color", // Select specific fields
          model: "ReservationTagCategory", // Reference to the Category model
        },
      })
      .exec(); // Execute the query

    // Convert all reservation documents found to plain JavaScript objects and return as an array
    return addReservations.map((addReservation) => addReservation.toObject());
  }

  async update(id: string, addReservation: AddReservationModel): Promise<any> {
    // Find the existing reservation by its ID
    const existReservation = await AddReservation.findById(id);

    // Find the associated CheckInCheckOut record for this reservation
    const existingCheckInCheckOut = await CheckInCheckOut.findOne({
      reservation: id,
    });

    // Find the client associated with the existing reservation
    const existClient = await Client.findOne({ _id: existReservation?.client });

    // Obtain the current date and time in the 'Asia/Kolkata' timezone
    const options = { timeZone: "Asia/Kolkata" };
    const currentDate = new Date().toLocaleString("en-US", options);
    const date = new Date(currentDate);
    const dateObject = new Date(date);

    // Extract hours, minutes, and seconds from the current time
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    // Format the time as HH:MM:SS
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    // Check and update CheckInTime if reservation is changing to 'arrived'
    if (
      existReservation?.reservationStatus !== "arrived" &&
      existReservation?.reservationStatus !== "left" &&
      addReservation.reservationStatus === "arrived"
    ) {
      // Prepare new CheckInTime data
      const newCheckInData = {
        checkInTime: formattedTime,
      };

      // Update CheckInTime for this reservation in CheckInCheckOut collection
      const updatedCheckInCheckOut = await CheckInCheckOut.findByIdAndUpdate(
        existingCheckInCheckOut?._id,
        newCheckInData,
        {
          new: true,
        }
      ).populate({
        path: "client",
        select: "id salutation firstName lastName phone email gender isClient",
      });
    }

    // Check and update CheckOutTime if reservation is changing to 'left'
    if (
      existReservation?.reservationStatus !== "left" &&
      addReservation.reservationStatus === "left"
    ) {
      // Prepare new CheckOutTime data
      const newCheckOutData = {
        checkOutTime: formattedTime,
      };

      // Increment client visits and update CheckOutTime in CheckInCheckOut collection
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

    // Increase 'reservationCencel' count if reservation status changes to 'cancelled and notify'
    if (
      existReservation?.reservationStatus !== "cancelled and notify" &&
      addReservation.reservationStatus === "cancelled and notify"
    ) {
      // Increment 'reservationCencel' count for the client
      if (existClient) {
        existClient.reservationCencel = existClient.reservationCencel + 1; // Increment cancellation count
        await existClient.save(); // Save the changes
      }
    }

    // Update the reservation with new data
    const updatedAddReservation = await AddReservation.findByIdAndUpdate(
      id,
      addReservation,
      {
        new: true,
      }  
    )
      // Populate associated fields for the updated reservation
      .populate({
        path: "client",
        select: "id salutation firstName lastName phone email gender isClient",
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
        path: "reservationTags",
        select: "id name categoryNameId",
        populate: {
          path: "categoryNameId",
          select: "id name color",
          model: "ReservationTagCategory",
        },
      })
      .exec();

    /* Logging reservation status update */

    // Log the status change if there's a difference in reservation status
    if (
      existReservation?.reservationStatus !==
      updatedAddReservation?.reservationStatus
    ) {
      const log = loggerService.createLogs({
        level: "info",
        timestamp: `${logTime()}`,
        message: `Reservation status changed from ${existReservation?.reservationStatus} to ${updatedAddReservation?.reservationStatus}`,
        reservation: id,
      });
    }

    /** End of Logging */

    // Update total spends if prePayment or onSitePayment is modified
    if (addReservation.prePayment !== 0 || addReservation.onSitePayment !== 0) {
      if (existClient) {
        // Fetch all reservations for the client
        const clientReservations = await AddReservation.find({
          client: existClient._id,
        });
        // Calculate total spends based on prePayment and onSitePayment
        const totalSpends = clientReservations.reduce((total, reservation) => {
          return (
            total +
            (reservation.prePayment || 0) +
            (reservation.onSitePayment || 0)
          );
        }, 0);

        // Update 'spends' property for the client
        existClient.spends = totalSpends;
        await existClient.save(); // Save the changes
      }
    }

    // Log reservation update information for the client
    if (existClient) {
      logger.info(
        `${updatedAddReservation?.bookedBy} Updated the Reservation of ${
          existClient?.firstName + " " + existClient?.lastName
        }`
      );
    }

    // Return the updated reservation object if exists, otherwise null
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
