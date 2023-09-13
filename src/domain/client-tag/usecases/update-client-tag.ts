import { ErrorClass } from "@presentation/error-handling/api-error";
import { ClientTagEntity, ClientTagModel } from "../entities/client-tag-entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ClientTagRepository } from "../repositories/client-tag-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface UpdateClientTagUsecase {
  execute: (
    tagId: string,
    tagData: ClientTagEntity
  ) => Promise<Either<ErrorClass, ClientTagEntity>>;
}

export class UpdateClientTag implements UpdateClientTagUsecase {
  private readonly clientTagRepository: ClientTagRepository;

  constructor(clientTagRepository: ClientTagRepository) {
    this.clientTagRepository = clientTagRepository;
  }

  async execute(
    clientTagId: string,
    clientData: ClientTagEntity
  ): Promise<Either<ErrorClass, ClientTagEntity>> {
    return await this.clientTagRepository.updateClientTag(clientTagId, clientData);
  }
}