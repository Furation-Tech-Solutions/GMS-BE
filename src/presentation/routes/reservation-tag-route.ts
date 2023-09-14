import mongoose from "mongoose";
import { Router } from "express";
import { ReservationTagServices } from "@presentation/services/reservation-tag-services"; // Import the TagCategoryServices
import { ReservationTagDataSourceImpl } from "@data/reservation-tag/datasources/reservation-tag-data-source"; // Import the TagDataSourceImpl
import { ReservationTagRepositoryImpl } from "@data/reservation-tag/repositories/reservation-tag-repository-impl"; // Import the TagRepositoryImpl
import { CreateReservationTag } from "@domain/reservation-tag/usecases/create-reservation-tag"; // Import tag category-related use cases
import { DeleteReservationTag } from "@domain/reservation-tag/usecases/delete-reservation-tag";
import { GetReservationTagById } from "@domain/reservation-tag/usecases/get-reservation-tag-by-id";
import { GetAllReservationTag } from "@domain/reservation-tag/usecases/get-all-reservation-tag";
import { UpdateReservationTag } from "@domain/reservation-tag/usecases/update-reservation-tag";

// Create an instance of the TagDataSourceImpl and pass the mongoose connection
const reservationTagDataSource = new ReservationTagDataSourceImpl(mongoose.connection);

// Create an instance of the TagRepositoryImpl and pass the TagDataSourceImpl
const reservationTagRepository = new ReservationTagRepositoryImpl(reservationTagDataSource);

// Create instances of the required use cases and pass the TagRepositoryImpl
const createReservationTagUsecase = new CreateReservationTag(reservationTagRepository);
const deleteReservationTagUsecase = new DeleteReservationTag(reservationTagRepository);
const getReservationTagByIdUsecase = new GetReservationTagById(reservationTagRepository);
const getAllReservationTagUsecase = new GetAllReservationTag(reservationTagRepository);
const updateReservationTagUsecase = new UpdateReservationTag(reservationTagRepository);

// Initialize TagServices and inject required dependencies
const reservationTagService = new ReservationTagServices(
    createReservationTagUsecase,
    deleteReservationTagUsecase,
    getReservationTagByIdUsecase,
    getAllReservationTagUsecase,
    updateReservationTagUsecase
);

// Create an Express router
export const reservationTagRouter = Router();

// Route handling for creating a new tag
reservationTagRouter.post(
    "/add",
    reservationTagService.createReservationTag.bind(reservationTagService)
);

// Route handling for deleting a tag by ID
reservationTagRouter.delete(
    "/:ReservationTagId",
    reservationTagService.deleteReservationTag.bind(reservationTagService)
);

// Route handling for getting a tag by ID
reservationTagRouter.get(
    "/:ReservationTagId",
    reservationTagService.getReservationTagById.bind(reservationTagService)
);

// Route handling for getting all tag
reservationTagRouter.get("/", reservationTagService.getAllReservationTags.bind(reservationTagService));

// Route handling for updating a tag by ID
reservationTagRouter.put(
    "/:ReservationTagId",
    reservationTagService.updateReservationTag.bind(reservationTagService)
);