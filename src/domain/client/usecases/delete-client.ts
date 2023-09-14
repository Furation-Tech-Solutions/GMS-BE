import { Either } from "monet";
import { ClientRepository } from "../repositories/client-repo"; // Import the ClientRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface DeleteClientUsecase {
    execute: (clientID: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteClient implements DeleteClientUsecase {
    private readonly clientRepository: ClientRepository;

    constructor(clientRepository: ClientRepository) {
        this.clientRepository = clientRepository;
    }

    async execute(clientID: string): Promise<Either<ErrorClass, void>> {
        return await this.clientRepository.deleteClient(clientID);
    }
}
