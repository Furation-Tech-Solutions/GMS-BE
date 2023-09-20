import { ClientEntity, ClientModel } from "@domain/client/entities/client_entities"; // Import the ClientModel
import { ClientRepository } from "@domain/client/repositories/client-repo"; // Import the ClientRepository
import { ClientDataSource } from "../datasource/client-datasource"; // Import the ClientDataSource
import { Either, Right, Left } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class ClientRepositoryImpl implements ClientRepository {
    private readonly clientDataSource: ClientDataSource; 
    constructor(clientDataSource: ClientDataSource) { 
        this.clientDataSource = clientDataSource;
    }

    async createClient(client: ClientModel): Promise<Either<ErrorClass, ClientEntity>> {
        try {
            const createdClient = await this.clientDataSource.create(client); // Use the client data source
            return Right<ErrorClass, ClientEntity>(createdClient);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, ClientEntity>(ApiError.clientExist());
            }
            return Left<ErrorClass, ClientEntity>(ApiError.badRequest());
        }
    }

    async deleteClient(id: string): Promise<Either<ErrorClass, void>> {
        try {
            const i = await this.clientDataSource.delete(id); // Use the client data source
            return Right<ErrorClass, void>(i); // Return Right if the deletion was successful
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, void>(ApiError.notFound());
            }
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }

    async updateClient(id: string, data: ClientModel): Promise<Either<ErrorClass, ClientEntity>> {
        try {
            const updatedClient = await this.clientDataSource.update(id, data); // Use the client data source
            return Right<ErrorClass, ClientEntity>(updatedClient);
        } catch (e) {
            if (e instanceof ApiError && e.name === "conflict") {
                return Left<ErrorClass, ClientEntity>(ApiError.clientExist());
            }
            return Left<ErrorClass, ClientEntity>(ApiError.badRequest());
        }
    }

    async getAllClients(): Promise<Either<ErrorClass, ClientEntity[]>> {
        try {
            const clients = await this.clientDataSource.getAllClients(); // Use the client data source
            return Right<ErrorClass, ClientEntity[]>(clients);
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, ClientEntity[]>(ApiError.notFound());
            }
            return Left<ErrorClass, ClientEntity[]>(ApiError.badRequest());
        }
    }

    async getClientById(id: string): Promise<Either<ErrorClass, ClientEntity>> {
        try {
            const client = await this.clientDataSource.read(id); // Use the client data source
            return client
                ? Right<ErrorClass, ClientEntity>(client)
                : Left<ErrorClass, ClientEntity>(ApiError.notFound());
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, ClientEntity>(ApiError.notFound());
            }
            return Left<ErrorClass, ClientEntity>(ApiError.badRequest());
        }
    }
}
