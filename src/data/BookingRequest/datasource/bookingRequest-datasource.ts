import mongoose from "mongoose";
import { BookingRequestEntity, BookingRequestModel } from "@domain/bookingRequest/entities/bookingRequest_entities"; // Import the BookingRequestModel
import { BookingRequest } from "../models/bookingRequest-model";
import ApiError from "@presentation/error-handling/api-error";
import EmailService from "@presentation/services/send-mail";

// Create BookingRequestDataSource Interface
export interface BookingRequestDataSource {
    create(bookingRequest: BookingRequestModel): Promise<any>;
    update(id: string, bookingRequest: BookingRequestEntity): Promise<any>;
    delete(id: string): Promise<void>;
    read(id: string): Promise<any | null>;
    getAllBookingRequests(outletId:string): Promise<any[]>;
}

// BookingRequest Data Source communicates with the database
export class BookingRequestDataSourceImpl implements BookingRequestDataSource {
    constructor(private db: mongoose.Connection) { }
    async create(bookingRequest: BookingRequestModel): Promise<any> {
        const bookingRequestData = new BookingRequest(bookingRequest);
        const createdBookingRequest = await bookingRequestData.save();
        // const emailService = new EmailService();

        // try {
        //     await emailService.sendEmail({
        //         email: bookingRequest.email,
        //         subject: "Thank you For your Booking Request!",
        //         message: "Thank you For your Booking Request",
        //     });
        // } catch (error) {
        //     throw ApiError.badRequest();
        // }
        return createdBookingRequest.toObject();
    }
    async delete(id: string): Promise<void> {
        try {
            await BookingRequest.findByIdAndDelete(id);
        } catch (error) {
            throw ApiError.badRequest();
        }
    }

    async read(id: string): Promise<any | null> {
        try {
            const bookingRequest = await BookingRequest.findById(id);
            return bookingRequest ? bookingRequest.toObject() : null;
        } catch (error) {
            throw ApiError.badRequest();
        } // Convert to a plain JavaScript object before returning
    }
    async getAllBookingRequests(outletId:string): Promise<any[]> {
        try {
            const bookingRequests = await BookingRequest.find({outletId:outletId});
            return bookingRequests.map((request) => request.toObject()); // Convert to plain JavaScript objects before returning
        } catch (error) {
            throw ApiError.badRequest();
        }
    }
    async update(id: string, bookingRequest: BookingRequestEntity): Promise<any> {
        try {
            const updatedBookingRequest = await BookingRequest.findByIdAndUpdate(id, bookingRequest, {
                new: true,
            }); // No need for conversion here
            return updatedBookingRequest ? updatedBookingRequest.toObject() : null; // Convert to a plain JavaScript object before returning
        } catch (error) {
            throw ApiError.badRequest();
        }
    }
}


