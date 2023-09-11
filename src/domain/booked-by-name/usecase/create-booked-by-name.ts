import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { BookedByNameEntity, BookedByNameModel } from "../entities/booked-by-name";
import { BookedByNameRepository } from "../repositories/booked-by-name-repository";

export interface CreateBookedByNameUseCase {
  execute: (bookedByNameData: BookedByNameModel) => Promise<Either<ErrorClass,BookedByNameEntity>>;
}

export class CreateBookedByName implements CreateBookedByNameUseCase {
  private readonly bookedByNameRepository: BookedByNameRepository;

  constructor(bookedByNameRepository: BookedByNameRepository) {
    this.bookedByNameRepository = bookedByNameRepository;
  }

  async execute(bookedByNameData: BookedByNameModel): Promise<Either<ErrorClass,BookedByNameEntity>> {
    return await this.bookedByNameRepository.createBookedByName(bookedByNameData);
  }
  
}
