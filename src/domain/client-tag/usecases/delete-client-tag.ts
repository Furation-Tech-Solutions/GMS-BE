import { ErrorClass } from "@presentation/error-handling/api-error";
import { ClientTagEntity, ClientTagModel } from "../entities/client-tag-entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ClientTagRepository } from "../repositories/client-tag-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";
export interface DeleteClientTagUsecase {
    execute: (clientTagId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteClientTag implements DeleteClientTagUsecase {
    private readonly clientTagRepository: ClientTagRepository;

    constructor(clientTagRepository: ClientTagRepository) {
        this.clientTagRepository = clientTagRepository;
    }

    async execute(clientTagId: string): Promise<Either<ErrorClass, void>> {
        return await this.clientTagRepository.deleteClientTag(clientTagId);
    }
}