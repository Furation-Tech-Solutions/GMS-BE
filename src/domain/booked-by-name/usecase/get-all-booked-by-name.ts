import { AdminEntity } from "@domain/admin/entities/admin";
// import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { BookedByNameRepository} from "@domain/booked-by-name/repositories/booked-by-name-repository";
import { BookedByNameEntity } from "../entities/booked-by-name";
export interface GetAllBookedByNameUsecase {
  execute: () => Promise<Either<ErrorClass, BookedByNameEntity[]>>;
}

export class GetAllBookedByName implements GetAllBookedByNameUsecase {
  private readonly bookedByNameRepository: BookedByNameRepository;

  constructor(bookedByNameRepository: BookedByNameRepository) {
    this.bookedByNameRepository = bookedByNameRepository;
  }

  async execute(): Promise<Either<ErrorClass, BookedByNameEntity[]>> {
    return await this.bookedByNameRepository.getAllBookedByName();
  }
}