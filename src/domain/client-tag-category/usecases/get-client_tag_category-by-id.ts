import { ErrorClass } from "@presentation/error-handling/api-error";
import { ClientTagCategoryEntity } from "../entities/client_tag_category_entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ClientTagCategoryRepository } from "../repositories/client_tag_category-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface GetClientTagCategoryByIdUsecase {
  execute: (clientTagCategoryId: string) => Promise<Either<ErrorClass, ClientTagCategoryEntity>>;
}

export class GetClientTagCategoryById implements GetClientTagCategoryByIdUsecase {
  private readonly clientTagCategoryRepository: ClientTagCategoryRepository;

  constructor(clientTagCategoryRepository: ClientTagCategoryRepository) {
    this.clientTagCategoryRepository = clientTagCategoryRepository;
  }

  async execute(clientTagCategoryId: string): Promise<Either<ErrorClass, ClientTagCategoryEntity>> {
    return await this.clientTagCategoryRepository.getTagClientCategoryById(clientTagCategoryId);
  }
}

