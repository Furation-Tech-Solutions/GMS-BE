import { BookedByNameRepositoryImpl } from "@data/booked-by-name/repositories/booked-by-name-repository-impl";
import { type AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { BookedByNameRepository } from "../repositories/booked-by-name-repository";

export interface DeleteBookedByNameUseCase {
  execute: (adminId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteBookedByName implements DeleteBookedByNameUseCase {
  private readonly bookedByNameRepository: BookedByNameRepository;

  constructor(bookedByNameRepository: BookedByNameRepository) {
    this.bookedByNameRepository = bookedByNameRepository;
  }

  async execute(adminId: string): Promise<Either<ErrorClass, void>> {
    return await this.bookedByNameRepository.deleteBookedByName(adminId);
  }
}
