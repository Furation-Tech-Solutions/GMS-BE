import { ErrorClass } from "@presentation/error-handling/api-error";
import { ClientTagEntity, ClientTagModel } from "../entities/client-tag-entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ClientTagRepository } from "../repositories/client-tag-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface GetClientTagByIdUsecase {
  execute: (clientTagId: string) => Promise<Either<ErrorClass, ClientTagEntity>>;
}

export class GetClientTagById implements GetClientTagByIdUsecase {
  private readonly clientTagRepository: ClientTagRepository;

  constructor(clientTagRepository: ClientTagRepository) {
    this.clientTagRepository = clientTagRepository;
  }

  async execute(clientTagId: string): Promise<Either<ErrorClass, ClientTagEntity>> {
    return await this.clientTagRepository.getTagClientById(clientTagId);
  }
}