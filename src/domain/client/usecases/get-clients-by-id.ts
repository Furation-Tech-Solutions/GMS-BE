import { Either } from "monet";
import { ClientEntity } from "../entities/client_entities"; // Import the ClientEntity
import { ClientRepository } from "../repositories/client-repo"; // Import the ClientRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface GetClientByIdUsecase {
  execute: (clientID: string) => Promise<Either<ErrorClass, ClientEntity>>;
}

export class GetClientById implements GetClientByIdUsecase {
  private readonly clientRepository: ClientRepository; // Change to ClientRepository

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(clientID: string): Promise<Either<ErrorClass, ClientEntity>> {
    return await this.clientRepository.getClientById(clientID); // Change to getClientById
  }
}
