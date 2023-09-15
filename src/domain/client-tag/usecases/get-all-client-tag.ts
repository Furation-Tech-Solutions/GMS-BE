import { ErrorClass } from "@presentation/error-handling/api-error";
import { ClientTagEntity, ClientTagModel } from "../entities/client-tag-entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ClientTagRepository } from "../repositories/client-tag-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface GetAllClienttagUsecase {
  execute: () => Promise<Either<ErrorClass, ClientTagEntity[]>>;
}

export class GetAllClientTag implements GetAllClienttagUsecase {
  private readonly clientTagRepository: ClientTagRepository;

  constructor(clientTagRepository: ClientTagRepository) {
    this.clientTagRepository = clientTagRepository;
  }

  async execute(): Promise<Either<ErrorClass, ClientTagEntity[]>> {
    return await this.clientTagRepository.getAllClientTag();
  }
}