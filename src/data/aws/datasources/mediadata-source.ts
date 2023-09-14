import ApiError from "@presentation/error-handling/api-error";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import env from "../../../main/config/env";

dotenv.config();

export interface OutletMediaDataSource {
  getPresignedUrl(objectKey: string): Promise<string>;
  deleteBrandLogo(): Promise<string>;
}

export class OutletMediaDataSourceImpl implements OutletMediaDataSource {
  async getPresignedUrl(objectKey: string): Promise<string> {
    try {
      const s3 = new AWS.S3({
        region: "ap-south-1",
        credentials: {
          accessKeyId: env.accessKeyId,
          secretAccessKey: env.secretAccessKey,
        },
      });

      const params = {
        Bucket: "gms-imageupload",
        Key: `outlets/${objectKey}/brand-image/image-path` + ".jpg",
        Expires: 3600,
      };
      return await s3.getSignedUrlPromise("putObject", params);
    } catch (error) {
      throw ApiError.awsPresigningError();
    }
  }

  async deleteBrandLogo(): Promise<string> {
    try {
      const defaultLogoUrl: string =
        process.env.DEFAULT_PROFILE_IMAGE_URL ||
        "https://gms-imageupload.s3.ap-south-1.amazonaws.com/outlets/default-brand-logo.jpg";
      return defaultLogoUrl;
    } catch (error) {
      throw ApiError.brandLogoDeletionError();
    }
  }
}
