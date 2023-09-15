import { GuestEntity, GuestModel } from "@domain/guest/entities/guest_entities";
import { GuestRepository } from "@domain/guest/repositories/guest-repo";
import { GuestDataSource } from "../datasource/guest-datasource";
import { Either, Right, Left } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class GuestRepositoryImpl implements GuestRepository {
  private readonly guestDataSource: GuestDataSource;
  constructor(guestDataSource: GuestDataSource) {
    this.guestDataSource = guestDataSource;
  }

  async createGuest(guest: GuestModel): Promise<Either<ErrorClass, GuestEntity>> {
    try {
      const i = await this.guestDataSource.create(guest);
      return Right<ErrorClass, GuestEntity>(i);
    } catch (error) {
      if (error instanceof ApiError && error.name === "conflict") {
        return Left<ErrorClass, GuestEntity>(ApiError.emailExist());
      }
      return Left<ErrorClass, GuestEntity>(ApiError.badRequest());
    }
  }
  async deleteGuest(id: string): Promise<Either<ErrorClass, void>> {
    // await this.dataSource.delete(id);
    try {
      const i = await this.guestDataSource.delete(id);
      return Right<ErrorClass, void>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "notfound") {
        return Left<ErrorClass, void>(ApiError.notFound());
      }
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }
  async updateGuest(
    id: string,
    data: GuestModel
  ): Promise<Either<ErrorClass, GuestEntity>> {
    try {
      const i = await this.guestDataSource.update(id, data);
      return Right<ErrorClass, GuestEntity>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "conflict") {
        return Left<ErrorClass, GuestEntity>(ApiError.emailExist());
      }
      return Left<ErrorClass, GuestEntity>(ApiError.badRequest());
    }
    // return await this.dataSource.update(id, data);
  }

  async getAllGuests(): Promise<Either<ErrorClass, GuestEntity[]>> {
    // return await this.dataSource.getAllCompany();
    try {
      const i = await this.guestDataSource.getAllGuests();
      return Right<ErrorClass, GuestEntity[]>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "notfound") {
        return Left<ErrorClass, GuestEntity[]>(ApiError.notFound());
      }
      return Left<ErrorClass, GuestEntity[]>(ApiError.badRequest());
    }
  }


  async getGuestbyId(id: string): Promise<Either<ErrorClass, GuestEntity>> {
    // return await this.dataSource.read(id);
    try {
      const i = await this.guestDataSource.read(id);
      return Right<ErrorClass, GuestEntity>(i);
    } catch (e) {
      if (e instanceof ApiError && e.name === "notfound") {
        return Left<ErrorClass, GuestEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, GuestEntity>(ApiError.badRequest());
    }
  }
}