import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { BookedByNameEntity, BookedByNameModel } from "../entities/booked-by-name";

export interface BookedByNameRepository {
    createBookedByName(bookedByName: BookedByNameModel): Promise<Either<ErrorClass, BookedByNameEntity>>;
    getAllBookedByName(): Promise<Either<ErrorClass, BookedByNameEntity[]>>;
    getNameById(id: string):Promise<Either<ErrorClass, BookedByNameEntity>>;
    updateName(id: string, data: BookedByNameModel ): Promise<Either<ErrorClass, BookedByNameEntity>> 
    deleteBookedByName(id: string): Promise<Either<ErrorClass, void>>;
}
