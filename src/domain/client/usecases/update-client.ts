import { Either } from "monet";
import { ClientEntity } from "../entities/client_entities"; // Import the ClientEntity
import { ClientRepository } from "../repositories/client-repo"; // Import the ClientRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface UpdateClientUsecase {
  execute: (
    clientId: string,
    clientData: ClientEntity
  ) => Promise<Either<ErrorClass, ClientEntity>>;
}

export class UpdateClient implements UpdateClientUsecase {
  private readonly clientRepository: ClientRepository; // Change to ClientRepository

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(
    clientId: string,
    clientData: ClientEntity
  ): Promise<Either<ErrorClass, ClientEntity>> {
    return await this.clientRepository.updateClient(clientId, clientData); // Change to updateClient
  }
}
