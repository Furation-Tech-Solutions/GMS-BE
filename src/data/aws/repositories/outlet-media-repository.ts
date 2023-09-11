// import { OutletMediaDataSource } from "@data/outlet/datasources/outlet-media-data-source";
import { Either, Left, Right } from "monet";
import { GetPresignedUrlEntity, outletMediaEntity} from "@domain/outlet/entities/outlet-media";
import { MediaOutletRepository } from "@domain/outlet/repositories/media-outlet-repository";
import { OutletMediaDataSource } from "../datasources/mediadata-source";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

// Define the OutletMediaRepository interface
export interface OutletMediaRepository {
  getPresignedUrl(objectKey: string): Promise<string>;
  deleteBrandLogo(objectKey: string): Promise<string>;
}

// Implement the OutletMediaRepository
export class OutletMediaRepositoryImpl implements MediaOutletRepository {
  constructor(private readonly outletMediaDataSource: OutletMediaDataSource) {}

  async getPreSignedUrl(objectKey: string): Promise<Either<ErrorClass, string>> {
    // Call the OutletMediaDataSource to get the signed URL
    try {
      const signedUrl = await this.outletMediaDataSource.getPresignedUrl(objectKey);
      return Right<ErrorClass, string>(signedUrl);
    } catch (error) {
      return Left<ErrorClass, string>(ApiError.badRequest());
    }
  }

  async deleteBrandLogo(): Promise<Either<ErrorClass, string>> {
    try {

      // Call the OutletMediaDataSource to delete the brand logo
      const deleteBrandLogo = await this.outletMediaDataSource.deleteBrandLogo();
      return Right<ErrorClass, string>(deleteBrandLogo);
    } catch (error) {
        return Left<ErrorClass, string>(ApiError.badRequest());
    }
  }
}
