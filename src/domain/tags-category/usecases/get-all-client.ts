import { Either } from "monet";
import { ClientEntity } from "../entities/tag_category_entities"; // Import the ClientEntity
import { ClientRepository } from "../repositories/tag_category-repo"; // Import the ClientRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface GetAllClientsUsecase {
  execute: () => Promise<Either<ErrorClass, ClientEntity[]>>;
}

export class GetAllClients implements GetAllClientsUsecase {
  private readonly clientRepository: ClientRepository;
  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async execute(): Promise<Either<ErrorClass, ClientEntity[]>> {
    return await this.clientRepository.getAllClients();
  }
}
