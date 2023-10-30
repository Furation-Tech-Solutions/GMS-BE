import { Outlet } from "@data/outlet/models/outlet-model";
import { Request, Response, NextFunction } from 'express';

import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";



const verifyOutlet = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {

      const outletIdHeader = req.headers.email2 as string;


      console.log( outletIdHeader, "outletIdHeader")
  
      if (outletIdHeader ) {
        const outletToCheck = outletIdHeader;
        const outlet = await Outlet.findOne({ _id: outletToCheck });

        console.log(outlet)

        if (outlet) {
          req.outletId = outletIdHeader;

          console.log(outlet, "outlet");
          next(); // User found, proceed to the next middleware or route handler.
        } else {
          const unAuthorized = ApiError.unAuthorized();
          return res
            .status(unAuthorized.status)
            .json({ message: unAuthorized.message });
        }
      } else {
        const unAuthorized = ApiError.unAuthorized();
        return res
          .status(unAuthorized.status)
          .json({ message: unAuthorized.message });
      }
    } catch (error) {
      const internalError = ApiError.internalError();
      return res
        .status(internalError.status)
        .json({ message: internalError.message });
    }
  };


  export {
    verifyOutlet
  };