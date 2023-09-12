

// Import necessary classes, interfaces, and dependencies
import { Request, Response } from "express";


import ApiError from "@presentation/error-handling/api-error";
import { GetPreSignedUrlUsecase } from "@domain/outlet/usecases/get-presignedurl";
import { DeleteBrandLogoUsecase } from "@domain/outlet/usecases/delete-brandlogo";

import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class MediaOutletService {

  private readonly createOutletMediaUsecase: GetPreSignedUrlUsecase;
  private readonly deleteBrandLogoUsecase: DeleteBrandLogoUsecase;
  constructor(
    createOutletMediaUsecase: GetPreSignedUrlUsecase,
    deleteBrandLogoUsecase: DeleteBrandLogoUsecase,

  ) {
    this.createOutletMediaUsecase = createOutletMediaUsecase;
    this.deleteBrandLogoUsecase = deleteBrandLogoUsecase;
  }

  async getPreSignedUrl(  
    req: Request,
    res: Response,
    ){
        
      const outletId: string = req.params.outletId;
      const presignedurl: Either<ErrorClass, string> =await this.createOutletMediaUsecase.execute(outletId);

      presignedurl.cata(
        (error: ErrorClass) => {
          res.status(error.status).json({ error: error.message });
        },
        async (result: string) => {
          res.status(200).json({ "presignedurl": result});
        }
      )  
  }
  
  async deletePreSignedUrl(req: Request, res: Response) {

    const deletedBrandLogo: Either<ErrorClass, string>=await this.deleteBrandLogoUsecase.execute();

    deletedBrandLogo.cata(
      (error: ErrorClass) => { 
        res.status(error.status).json({error: error.message});
      },
      async (result: string) => {
        res.status(200).json(result);
      }
    )
  }
}
