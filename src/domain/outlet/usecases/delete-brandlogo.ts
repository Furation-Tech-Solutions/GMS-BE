import { MediaOutletRepository } from "@domain/outlet/repositories/media-outlet-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface DeleteBrandLogoUsecase {
  execute: () => Promise<Either<ErrorClass, string>>;
}

export class DeleteBrandLogo implements DeleteBrandLogoUsecase {
  private readonly mediaOutletRepo: MediaOutletRepository;

  constructor(mediaOutletRepo: MediaOutletRepository) {
    this.mediaOutletRepo = mediaOutletRepo;
  }

  async execute(): Promise<Either<ErrorClass, string>> {
    return await this.mediaOutletRepo.deleteBrandLogo();
  }
}
