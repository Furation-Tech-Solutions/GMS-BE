import { ErrorClass } from "@presentation/error-handling/api-error";
import { ClientEntity, ClientModel } from "../entities/client_entities"; // Import the ClientModel and ClientEntity
import { ClientRepository } from "../repositories/client-repo"; // Import the ClientRepository
import { Either, Right, Left } from "monet";

export interface CreateClientUsecase {
    execute: (clientData: ClientModel) => Promise<Either<ErrorClass, ClientEntity>>;
}

export class CreateClient implements CreateClientUsecase {
    private readonly clientRepository: ClientRepository;
    constructor(clientRepository: ClientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(clientData: ClientModel): Promise<Either<ErrorClass, ClientEntity>> {
        return await this.clientRepository.createClient(clientData);
    }
}
