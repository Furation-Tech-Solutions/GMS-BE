import { BookedByNameRepository} from "@domain/booked-by-name/repositories/booked-by-name-repository";
import { BookedByNameDataSource } from "../datasources/booked-by-names-data-source";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { AdminEntity } from "@domain/admin/entities/admin";
import { BookedByNameEntity, BookedByNameModel } from "@domain/booked-by-name/entities/booked-by-name";


export class BookedByNameRepositoryImpl implements BookedByNameRepository {
    private readonly bookedByNameDataSource: BookedByNameDataSource;
  
    constructor(bookedByNameDataSource: BookedByNameDataSource) {
      this.bookedByNameDataSource = bookedByNameDataSource;
    }
    async createBookedByName(
        bookedByName: BookedByNameModel
      ): Promise<Either<ErrorClass, BookedByNameEntity>> {
        try {
          let result = await this.bookedByNameDataSource.createBookedByName(bookedByName);
          return Right<ErrorClass, BookedByNameEntity>(result);
        } catch (error) {
          if (error instanceof ApiError && error.status === 409) {
            return Left<ErrorClass, BookedByNameEntity>(ApiError.nameExist());
          }
          return Left<ErrorClass, BookedByNameEntity>(ApiError.badRequest());
        }
      }
    async getAllBookedByName(): Promise<Either<ErrorClass, BookedByNameEntity[]>> {
        try {
          const response = await this.bookedByNameDataSource.getAllBookedByName();
          return Right<ErrorClass, BookedByNameEntity[]>(response);
        } catch (error) {
         
          return Left<ErrorClass, BookedByNameEntity[]>(ApiError.badRequest());
        }
      }
      async updateName(
        id: string,
        data: BookedByNameModel
      ): Promise<Either<ErrorClass, BookedByNameEntity>> {
        try {
          const response = await this.bookedByNameDataSource.updateName(id, data);
          return Right<ErrorClass, AdminEntity>(response);
        } catch (error) {
          return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
        }
      }
      async getNameById(id: string): Promise<Either<ErrorClass, BookedByNameEntity>> {
        try {
          let response = await this.bookedByNameDataSource.read(id);
          return Right<ErrorClass,BookedByNameEntity>(response);
        } catch (error) {
          if (error instanceof ApiError && error.status === 404) {
            return Left<ErrorClass, BookedByNameEntity>(ApiError.notFound());
          }
          return Left<ErrorClass, BookedByNameEntity>(ApiError.badRequest());
        }
      }

      async deleteBookedByName(id: string): Promise<Either<ErrorClass, void>> {
        try {
          const res = await this.bookedByNameDataSource.delete(id);
          return Right<ErrorClass, void>(res);
        } catch (error) {
          return Left<ErrorClass, void>(ApiError.badRequest());
        }
      }
}