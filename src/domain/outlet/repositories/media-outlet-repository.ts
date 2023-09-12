import { Either } from "monet";
import  ErrorClass from "@presentation/error-handling/api-error";

export interface MediaOutletRepository {
  getPreSignedUrl(objectKey: string): Promise<Either<ErrorClass, string>>;
  deleteBrandLogo(): Promise<Either<ErrorClass, string>>;
}
