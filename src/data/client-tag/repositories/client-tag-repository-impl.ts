import { ClientTagEntity, ClientTagModel } from "@domain/client-tag/entities/client-tag-entities"; // Import the TagModel
import { ClientTagRepository } from "@domain/client-tag/repositories/client-tag-repo"; // Import the TagRepository
import { ClientTagDataSource } from "../datasources/client-tag-data-source"; // Import the TagDataSource
import { Either, Right, Left } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class ClientTagRepositoryImpl implements ClientTagRepository {
    private readonly clientTagDataSource: ClientTagDataSource;
    constructor(clientTagDataSource: ClientTagDataSource) {
        this.clientTagDataSource = clientTagDataSource;
    }

    async createClientTag(clientTag: ClientTagModel): Promise<Either<ErrorClass, ClientTagEntity>> {
        try {
            const createdTag = await this.clientTagDataSource.create(clientTag); // Use the tag category data source
            return Right<ErrorClass, ClientTagEntity>(createdTag);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, ClientTagEntity>(ApiError.emailExist());
            }
            return Left<ErrorClass, ClientTagEntity>(ApiError.badRequest());
        }
    }

    async deleteClientTag(id: string): Promise<Either<ErrorClass, void>> {
        try {
            const result = await this.clientTagDataSource.delete(id); // Use the tag  data source
            return Right<ErrorClass, void>(result); // Return Right if the deletion was successful
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, void>(ApiError.notFound());
            }
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }

    async updateClientTag(id: string, data: ClientTagModel): Promise<Either<ErrorClass, ClientTagEntity>> {
        try {
            const updatedTag = await this.clientTagDataSource.update(id, data); // Use the tag category data source
            return Right<ErrorClass, ClientTagEntity>(updatedTag);
        } catch (e) {
            if (e instanceof ApiError && e.name === "conflict") {
                return Left<ErrorClass, ClientTagEntity>(ApiError.emailExist());
            }
            return Left<ErrorClass, ClientTagEntity>(ApiError.badRequest());
        }
    }

    async getAllClientTag(): Promise<Either<ErrorClass, ClientTagEntity[]>> {
        try {
            const clientTags= await this.clientTagDataSource.getAll();
            return Right<ErrorClass, ClientTagEntity[]>(clientTags);
        } catch (error) {
            if (error instanceof ApiError && error.name === "notfound") {
                return Left<ErrorClass, ClientTagEntity[]>(ApiError.notFound());
            }
            return Left<ErrorClass, ClientTagEntity[]>(ApiError.badRequest());
        }
    }

    async getTagClientById(id: string): Promise<Either<ErrorClass, ClientTagEntity>> {
        try {
            const tag = await this.clientTagDataSource.read(id); // Use the tag data source
            return tag
                ? Right<ErrorClass, ClientTagEntity>(tag)
                : Left<ErrorClass, ClientTagEntity>(ApiError.notFound());
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, ClientTagEntity>(ApiError.notFound());
            }
            return Left<ErrorClass, ClientTagEntity>(ApiError.badRequest());
        }
    }
}