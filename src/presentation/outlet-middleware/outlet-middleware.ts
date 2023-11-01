import { Outlet } from "@data/outlet/models/outlet-model";
import { Request, Response, NextFunction } from "express";

import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import Shift from "@data/availibility/models/shift-model";

const verifyOutlet = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let outletIdHeader;
    // const updateData= await Shift.updateMany({outletId:"653f49aa1866b0891e3b794d"})
    if (req.headers.outletid ) {
      outletIdHeader = req.headers.outletid;
    } else {
      outletIdHeader = req.user.outlet[0];
    }


    if (outletIdHeader) {
      const outletToCheck = outletIdHeader;
      const outlet = await Outlet.findOne({ _id: outletToCheck });

      if (outlet) {
        req.outletId = outletIdHeader;

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

export { verifyOutlet };
