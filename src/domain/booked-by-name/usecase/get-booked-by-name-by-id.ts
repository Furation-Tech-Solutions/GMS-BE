import { AdminEntity } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { BookedByNameEntity } from "../entities/booked-by-name";
import { BookedByNameRepository } from "../repositories/booked-by-name-repository";
export interface GetNameByIdUsecase {
  execute: (nameId: string) => Promise<Either<ErrorClass, BookedByNameEntity>>;
}

export class GetNameById implements GetNameByIdUsecase {
  private readonly bookedByNameRepository: BookedByNameRepository;

  constructor(bookedByNameRepository: BookedByNameRepository) {
    this.bookedByNameRepository = bookedByNameRepository;
  }

  async execute(nameId: string): Promise<Either<ErrorClass, BookedByNameEntity>> {
    return await this.bookedByNameRepository.getNameById(nameId);
  }
}
