import mongoose from "mongoose";
import { Router } from "express";
import { GuestServices } from "@presentation/services/guest-services";
import { GuestDataSourceImpl } from "@data/guest/datasource/guest-datasource";
import { GuestRepositoryImpl } from "@data/guest/repository/guest-repo-impl";
import { CreateGuest } from "@domain/guest/usecases/create-guest";
import { GetAllGuests } from "@domain/guest/usecases/get-all-guests";
import { GetGuestById } from "@domain/guest/usecases/get-guests-by-id";
import { UpdateGuest } from "@domain/guest/usecases/update-guest";
import { create } from "domain";
import { DeleteGuest } from "@domain/guest/usecases/delete-guest";
import { validateGuestInputMiddleware } from "@presentation/middlewares/guest/validation-guest";
import { verifyLoggedInUser } from "@presentation/middlewares/auth-middleware";
import { checkPermission } from "@presentation/permission/permission-middleware";
import { verifyOutlet } from "@presentation/outlet-middleware/outlet-middleware";

// Create an instance of the GuestDataSourceImpl and pass the mongoose connection
const guestDataSource = new GuestDataSourceImpl(mongoose.connection);

// Create an instance of the GuestRepositoryImpl and pass the GuestDataSourceImpl
const guestRepository = new GuestRepositoryImpl(guestDataSource);

// Create instances of the required use cases and pass the GuestRepositoryImpl
const createGuestUsecase = new CreateGuest(guestRepository);
const deleteGuestUsecase = new DeleteGuest(guestRepository);
const getGuestByIdUsecase = new GetGuestById(guestRepository);
const getAllGuestsUsecase = new GetAllGuests(guestRepository);
const updateGuestUsecase = new UpdateGuest(guestRepository);

// Initialize GuestService and inject required dependencies
const guestService = new GuestServices(
  createGuestUsecase,
  deleteGuestUsecase,
  getGuestByIdUsecase,
  getAllGuestsUsecase,
  updateGuestUsecase
);

// Create an Express router
export const guestRouter = Router();

// Route handling for creating a new guest
guestRouter.post(
  "/add",
  verifyLoggedInUser,
  verifyOutlet,
  checkPermission([107, 207, 305]),
  validateGuestInputMiddleware(false),
  guestService.createGuest.bind(guestService)
);
// Route handling for deleting an guest by ID
guestRouter.delete(
  "/:guestId",
  verifyLoggedInUser,
  checkPermission([107, 207, 305]),
  guestService.deleteGuest.bind(guestService)
);

// Route handling for getting an guest by ID
guestRouter.get(
  "/:guestId",
  verifyLoggedInUser,
  verifyOutlet,
  checkPermission([107, 207, 305]),

  guestService.getGuestById.bind(guestService)
);

// Route handling for getting all companies
guestRouter.get(
  "/",
  verifyLoggedInUser,
  verifyOutlet,
  checkPermission([107, 207, 305]),

  guestService.getAllGuests.bind(guestService)
);

// Route handling for updating an compnay by ID
guestRouter.put(
  "/:guestId",
  validateGuestInputMiddleware(true),
  verifyLoggedInUser,
  checkPermission([107, 207, 305]),
  guestService.updateGuest.bind(guestService)
);

guestRouter.get(
  "/search",
  verifyLoggedInUser,
  checkPermission([107, 207, 305]),
  guestService.getAllSearchedGuests.bind(guestService)
);
