import { ClientTagEntity, ClientTagModel } from "../entities/client-tag-entities"; // Import the TagCategoryEntity and TagCategoryModel classes
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface ClientTagRepository {
    createClientTag(
        tag: ClientTagModel
    ): Promise<Either<ErrorClass, ClientTagEntity>>;
    deleteClientTag(id: string): Promise<Either<ErrorClass, void>>;
    getTagClientById(id: string): Promise<Either<ErrorClass, ClientTagEntity>>;
    updateClientTag(
        id: string,
        data: ClientTagModel
    ): Promise<Either<ErrorClass, ClientTagEntity>>;
    getAllClientTag(outletId:string): Promise<Either<ErrorClass, ClientTagEntity[]>>;
}