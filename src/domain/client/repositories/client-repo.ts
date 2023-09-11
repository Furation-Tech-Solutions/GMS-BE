import { ClientEntity, ClientModel } from "../entities/client_entities"; // Import the ClientEntity and ClientModel classes
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface ClientRepository {
    createClient(
        client: ClientModel
    ): Promise<Either<ErrorClass, ClientEntity>>; 
    deleteClient(id: string): Promise<Either<ErrorClass, void>>; 
    getClientById(id: string): Promise<Either<ErrorClass, ClientEntity>>; 
    updateClient(
        id: string,
        data: ClientModel
    ): Promise<Either<ErrorClass, ClientEntity>>; 
    getAllClients(): Promise<Either<ErrorClass, ClientEntity[]>>; 
}
