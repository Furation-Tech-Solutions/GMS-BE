import ApiError from "@presentation/error-handling/api-error";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import env from "../../../main/config/env";

dotenv.config();

export interface OutletMediaDataSource {
  getPresignedUrl(data_type:string,file_name: string ): Promise<string>;
  deleteBrandLogo(): Promise<string>;
}


export class OutletMediaDataSourceImpl implements OutletMediaDataSource {
  async getPresignedUrl(data_type:string,file_Name: string): Promise<string> {
    try {
      const uniqueIdentifier = Date.now()
      const s3 = new AWS.S3({
        region: "ap-south-1",
        credentials: {
          accessKeyId: env.accessKeyId,
          secretAccessKey: env.secretAccessKey,
        },
      });
      const fileName = file_Name.slice(0, file_Name.lastIndexOf('.'));
      const fileExtension = file_Name.slice(file_Name.lastIndexOf('.') + 1);
      // console.log(uniqueIdentifier,fileName,fileExtension);

      const params = {
        Bucket: "gms-imageupload",
        Key: `${data_type}/${uniqueIdentifier}_${fileName}` + `.${fileExtension}`,
        Expires: 3600,
      };
      // return "presignedurl"
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