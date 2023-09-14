
import { MediaOutletRepository } from "@domain/outlet/repositories/media-outlet-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetPreSignedUrlUsecase {
  execute: (outletId: string) => Promise<Either<ErrorClass, string>>;
}

export class GetPreSignedUrl implements GetPreSignedUrlUsecase {
  private readonly mediaOutletRepo: MediaOutletRepository;

  constructor(mediaOutletRepo: MediaOutletRepository) {
    this.mediaOutletRepo = mediaOutletRepo;
  }

  async execute(outletId: string): Promise<Either<ErrorClass, string>> {
    return await this.mediaOutletRepo.getPreSignedUrl(outletId);
  }
}





