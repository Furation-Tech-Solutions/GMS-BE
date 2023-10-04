import mongoose from "mongoose";
import { Router } from "express";
import { BookingRequestServices } from "@presentation/services/bookingRequest-services"; // Import the BookingRequestServices
import { BookingRequestDataSourceImpl } from "@data/BookingRequest/datasource/bookingRequest-datasource"; // Import the BookingRequestDataSourceImpl
import { BookingRequestRepositoryImpl } from "@data/BookingRequest/repository/bookingRequest-repo-impl"; // Import the BookingRequestRepositoryImpl
import { CreateBookingRequest } from "@domain/bookingRequest/usecases/create-bookingReq"; // Import the CreateBookingRequest use case
import { GetAllBookingRequests } from "@domain/bookingRequest/usecases/get-all-bookingrequest"; // Import the GetAllBookingRequests use case
import { GetBookingRequestById } from "@domain/bookingRequest/usecases/get-bookingRequest-by-id"; // Import the GetBookingRequestById use case
import { UpdateBookingRequest } from "@domain/bookingRequest/usecases/update-bookingReq"; // Import the UpdateBookingRequest use case
import { DeleteBookingRequest } from "@domain/bookingRequest/usecases/delete-bookingRequest"; // Import the DeleteBookingRequest use case
import { validateBookingRequestInputMiddleware } from "@presentation/middlewares/booking req/validation-bookingReq"; // Import the validateBookingRequestInputMiddleware
import { verifyLoggedInUser } from "@presentation/middlewares/auth-middleware";

// Create an instance of the BookingRequestDataSourceImpl and pass the mongoose connection
const bookingRequestDataSource = new BookingRequestDataSourceImpl(mongoose.connection);

// Create an instance of the BookingRequestRepositoryImpl and pass the BookingRequestDataSourceImpl
const bookingRequestRepository = new BookingRequestRepositoryImpl(bookingRequestDataSource);

// Create instances of the required use cases and pass the BookingRequestRepositoryImpl
const createBookingRequestUsecase = new CreateBookingRequest(bookingRequestRepository);
const deleteBookingRequestUsecase = new DeleteBookingRequest(bookingRequestRepository);
const getBookingRequestByIdUsecase = new GetBookingRequestById(bookingRequestRepository);
const getAllBookingRequestsUsecase = new GetAllBookingRequests(bookingRequestRepository);
const updateBookingRequestUsecase = new UpdateBookingRequest(bookingRequestRepository);

// Initialize BookingRequestServices and inject required dependencies
const bookingRequestService = new BookingRequestServices(
    createBookingRequestUsecase,
    deleteBookingRequestUsecase,
    getBookingRequestByIdUsecase,
    getAllBookingRequestsUsecase,
    updateBookingRequestUsecase
);

// Create an Express router
export const bookingRequestRouter = Router();

// Route handling for creating a new booking request
bookingRequestRouter.post(
    "/add",
  verifyLoggedInUser,
    validateBookingRequestInputMiddleware(false),
    bookingRequestService.createBookingRequest.bind(bookingRequestService)
);

// Route handling for deleting a booking request by ID
bookingRequestRouter.delete(
    "/:bookingRequestId",
    bookingRequestService.deleteBookingRequest.bind(bookingRequestService)
);

// Route handling for getting a booking request by ID
bookingRequestRouter.get(
    "/:bookingRequestId",
    bookingRequestService.getBookingRequestById.bind(bookingRequestService)
);

// Route handling for getting all booking requests
bookingRequestRouter.get("/", bookingRequestService.getAllBookingRequests.bind(bookingRequestService));

// Route handling for updating a booking request by ID
bookingRequestRouter.put(
    "/:bookingRequestId",
  verifyLoggedInUser,
    validateBookingRequestInputMiddleware(true),
    bookingRequestService.updateBookingRequest.bind(bookingRequestService)
);
