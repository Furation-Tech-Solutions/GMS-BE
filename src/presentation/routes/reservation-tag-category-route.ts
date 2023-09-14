import mongoose from "mongoose";
import { Router } from "express";
import { ReservationTagCategoryServices } from "@presentation/services/reservation-tag-category-services"; // Import the TagCategoryServices
import { ReservationTagCategoryDataSourceImpl } from "@data/reservation-tag-category/datasource/reservation_tag_Category-datasource"; // Import the TagCategoryDataSourceImpl
import { ReservationTagCategoryRepositoryImpl } from "@data/reservation-tag-category/repository/reservation_tag_category-repo-impl"; // Import the TagCategoryRepositoryImpl
import { CreateReservationTagCategory } from "@domain/reservation-tag-category/usecases/create-reservation_tags_category"; // Import tag category-related use cases
import { DeleteReservationTagCategory } from "@domain/reservation-tag-category/usecases/delete-reservation_tags_category";
import { GetReservationTagCategoryById } from "@domain/reservation-tag-category/usecases/get-reservation_tag_category-by-id";
import { GetAllReservationTagCategories } from "@domain/reservation-tag-category/usecases/get-all-reservation_tag_category";
import { UpdateReservationTagCategory } from "@domain/reservation-tag-category/usecases/update-reservation_tag_category";

// Create an instance of the ReservationTagCategoryDataSourceImpl and pass the mongoose connection
const reservationTagCategoryDataSource = new ReservationTagCategoryDataSourceImpl(mongoose.connection);

// Create an instance of the ReservationTagCategoryRepositoryImpl and pass the TagCategoryDataSourceImpl
const reservationtagCategoryRepository = new ReservationTagCategoryRepositoryImpl(reservationTagCategoryDataSource);

// Create instances of the required use cases and pass the ReservationTagCategoryRepositoryImpl
const createReservationTagCategoryUsecase = new CreateReservationTagCategory(reservationtagCategoryRepository);
const deleteReservationTagCategoryUsecase = new DeleteReservationTagCategory(reservationtagCategoryRepository);
const getReservationTagCategoryByIdUsecase = new GetReservationTagCategoryById(reservationtagCategoryRepository);
const getAllReservationTagCategoriesUsecase = new GetAllReservationTagCategories(reservationtagCategoryRepository);
const updateReservationTagCategoryUsecase = new UpdateReservationTagCategory(reservationtagCategoryRepository);

// Initialize TagCategoryServices and inject required dependencies
const reservationTagCategoryService = new ReservationTagCategoryServices(
    createReservationTagCategoryUsecase,
    deleteReservationTagCategoryUsecase,
    getReservationTagCategoryByIdUsecase,
    getAllReservationTagCategoriesUsecase,
    updateReservationTagCategoryUsecase
);

// Create an Express router
export const reservationTagCategoryRouter = Router();

// Route handling for creating a new tag category
reservationTagCategoryRouter.post(
    "/add",
    reservationTagCategoryService.createReservationTagCategory.bind(reservationTagCategoryService)
);

// Route handling for deleting a tag category by ID
reservationTagCategoryRouter.delete(
    "/:ReservationTagCategoryId",
    reservationTagCategoryService.deleteReservationTagCategory.bind(reservationTagCategoryService)
);

// Route handling for getting a tag category by ID
reservationTagCategoryRouter.get(
    "/:ReservationTagCategoryId",
    reservationTagCategoryService.getReservationTagCategoryById.bind(reservationTagCategoryService)
);

// Route handling for getting all tag categories
reservationTagCategoryRouter.get("/", reservationTagCategoryService.getAllReservationTagCategories.bind(reservationTagCategoryService));

// Route handling for updating a tag category by ID
reservationTagCategoryRouter.put(
    "/:ReservationTagCategoryId",
    reservationTagCategoryService.updateReservationTagCategory.bind(reservationTagCategoryService)
);

