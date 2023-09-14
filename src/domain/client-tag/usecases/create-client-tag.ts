import { ErrorClass } from "@presentation/error-handling/api-error";
import { ClientTagEntity, ClientTagModel } from "../entities/client-tag-entities"; // Import the TagCategoryModel and TagCategoryEntity
import { ClientTagRepository } from "../repositories/client-tag-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface CreateClientTagUsecase {
    execute: (reservationTagData: ClientTagModel) => Promise<Either<ErrorClass, ClientTagEntity>>;
}

export class CreateClientTag implements CreateClientTagUsecase {
    private readonly clientTagRepository: ClientTagRepository;
    constructor(clientTagRepository: ClientTagRepository) {
        this.clientTagRepository = clientTagRepository;
    }
    async execute(clientTagData: ClientTagModel): Promise<Either<ErrorClass, ClientTagEntity>> {
        return await this.clientTagRepository.createClientTag(clientTagData);
    }
}