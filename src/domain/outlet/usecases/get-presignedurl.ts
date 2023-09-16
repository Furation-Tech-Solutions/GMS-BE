import { MediaOutletRepository } from "@domain/outlet/repositories/media-outlet-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export interface GetPreSignedUrlUsecase {
  execute: (dataType:string,fileName:string) => Promise<Either<ErrorClass, string>>;
}

export class GetPreSignedUrl implements GetPreSignedUrlUsecase {
  private readonly mediaOutletRepo: MediaOutletRepository;

  constructor(mediaOutletRepo: MediaOutletRepository) {
    this.mediaOutletRepo = mediaOutletRepo;
  }

  async execute(dataType:string,fileName:string): Promise<Either<ErrorClass, string>> {
    return await this.mediaOutletRepo.getPreSignedUrl(dataType,fileName);
  }
}