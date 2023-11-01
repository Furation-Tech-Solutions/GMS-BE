import { ErrorClass } from "@presentation/error-handling/api-error";
import { ClientTagCategoryEntity, ClientTagCategoryModel } from "../entities/client_tag_category_entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ClientTagCategoryRepository } from "../repositories/client_tag_category-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface GetAllClientagCategoriesUsecase {
  execute: (outletId:string) => Promise<Either<ErrorClass, ClientTagCategoryEntity[]>>;
}

export class GetAllClientTagCategories implements GetAllClientagCategoriesUsecase {
  private readonly clientTagCategoryRepository: ClientTagCategoryRepository;

  constructor(clientTagCategoryRepository: ClientTagCategoryRepository) {
    this.clientTagCategoryRepository = clientTagCategoryRepository;
  }

  async execute(outletId:string): Promise<Either<ErrorClass, ClientTagCategoryEntity[]>> {
    return await this.clientTagCategoryRepository.getAllClientTagCategories(outletId);
  }
}
