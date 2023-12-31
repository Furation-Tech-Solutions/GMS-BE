import mongoose from "mongoose";
import { Router } from "express";
import { ClientTagServices } from "@presentation/services/client-tag-services"; // Import the TagCategoryServices
import { ClientTagDataSourceImpl } from "@data/client-tag/datasources/client-tag-data-source"; // Import the TagDataSourceImpl
import { ClientTagRepositoryImpl } from "@data/client-tag/repositories/client-tag-repository-impl"; // Import the TagRepositoryImpl
import { CreateClientTag } from "@domain/client-tag/usecases/create-client-tag"; // Import tag category-related use cases
import { DeleteClientTag } from "@domain/client-tag/usecases/delete-client-tag";
import { GetClientTagById } from "@domain/client-tag/usecases/get-client-tag-by-id";
import { GetAllClientTag } from "@domain/client-tag/usecases/get-all-client-tag";
import { UpdateClientTag } from "@domain/client-tag/usecases/update-client-tag";
import { validateClientTagInputMiddleware } from "@presentation/middlewares/client-tag/validation-client-tag";
import { verifyLoggedInUser } from "@presentation/middlewares/auth-middleware";
import { verifyOutlet } from "@presentation/outlet-middleware/outlet-middleware";

// Create an instance of the TagDataSourceImpl and pass the mongoose connection
const clientTagDataSource = new ClientTagDataSourceImpl(mongoose.connection);

// Create an instance of the TagRepositoryImpl and pass the TagDataSourceImpl
const clientTagRepository = new ClientTagRepositoryImpl(clientTagDataSource);

// Create instances of the required use cases and pass the TagRepositoryImpl
const createClientTagUsecase = new CreateClientTag(clientTagRepository);
const deleteClientTagUsecase = new DeleteClientTag(clientTagRepository);
const getClientTagByIdUsecase = new GetClientTagById(clientTagRepository);
const getAllClientTagUsecase = new GetAllClientTag(clientTagRepository);
const updateClientTagUsecase = new UpdateClientTag(clientTagRepository);

// Initialize TagServices and inject required dependencies
const clientTagService = new ClientTagServices(
    createClientTagUsecase,
    deleteClientTagUsecase,
    getClientTagByIdUsecase,
    getAllClientTagUsecase,
    updateClientTagUsecase
);

// Create an Express router
export const clientTagRouter = Router();

// Route handling for creating a new tag
clientTagRouter.post(
    "/add",
// checkPermission(["1108"]),
verifyLoggedInUser,
verifyOutlet,
validateClientTagInputMiddleware(false),
    clientTagService.createClientTag.bind(clientTagService)
);

// Route handling for deleting a tag by ID
clientTagRouter.delete(
    "/:ClientTagId",
    verifyLoggedInUser,
// checkPermission(["1108"]),

    clientTagService.deleteClientTag.bind(clientTagService)
);

// Route handling for getting a tag by ID
clientTagRouter.get(
    "/:ClientTagId",
    verifyLoggedInUser,
    clientTagService.getClientTagById.bind(clientTagService)
);

// Route handling for getting all tag
clientTagRouter.get("/",verifyLoggedInUser,
verifyOutlet, clientTagService.getAllClientTags.bind(clientTagService));

// Route handling for updating a tag by ID
clientTagRouter.put(
    "/:ClientTagId",
// checkPermission(["1108"]),
    validateClientTagInputMiddleware(true),
    verifyLoggedInUser,
    clientTagService.updateClientTag.bind(clientTagService)
);