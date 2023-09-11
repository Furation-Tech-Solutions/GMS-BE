import mongoose from "mongoose";
import { Router } from "express";
import { ClientServices } from "@presentation/services/client-services"; // Import the ClientServices
import { ClientDataSourceImpl } from "@data/client/datasource/client-datasource"; // Import the ClientDataSourceImpl
import { ClientRepositoryImpl } from "@data/client/repository/client-repo-impl"; // Import the ClientRepositoryImpl
import { CreateClient } from "@domain/client/usecases/create-client"; // Import the CreateClient use case
import { GetAllClients } from "@domain/client/usecases/get-all-client"; // Import the GetAllClients use case
import { GetClientById } from "@domain/client/usecases/get-clients-by-id"; // Import the GetClientById use case
import { UpdateClient } from "@domain/client/usecases/update-client"; // Import the UpdateClient use case
import { DeleteClient } from "@domain/client/usecases/delete-client"; // Import the DeleteClient use case

// Create an instance of the ClientDataSourceImpl and pass the mongoose connection
const clientDataSource = new ClientDataSourceImpl(mongoose.connection);

// Create an instance of the ClientRepositoryImpl and pass the ClientDataSourceImpl
const clientRepository = new ClientRepositoryImpl(clientDataSource);

// Create instances of the required use cases and pass the ClientRepositoryImpl
const createClientUsecase = new CreateClient(clientRepository);
const deleteClientUsecase = new DeleteClient(clientRepository);
const getClientByIdUsecase = new GetClientById(clientRepository);
const getAllClientsUsecase = new GetAllClients(clientRepository);
const updateClientUsecase = new UpdateClient(clientRepository);

// Initialize ClientService and inject required dependencies
const clientService = new ClientServices(
    createClientUsecase,
    deleteClientUsecase,
    getClientByIdUsecase,
    getAllClientsUsecase,
    updateClientUsecase
);

// Create an Express router
export const clientRouter = Router();

// Route handling for creating a new client
clientRouter.post(
    "/add",
    clientService.createClient.bind(clientService)
);

// Route handling for deleting a client by ID
clientRouter.delete(
    "/:clientId",
    clientService.deleteClient.bind(clientService)
);

// Route handling for getting a client by ID
clientRouter.get(
    "/:clientId",
    clientService.getClientById.bind(clientService)
);

// Route handling for getting all clients
clientRouter.get("/", clientService.getAllClients.bind(clientService));

// Route handling for updating a client by ID
clientRouter.put(
    "/:clientId",
    clientService.updateClient.bind(clientService)
);
