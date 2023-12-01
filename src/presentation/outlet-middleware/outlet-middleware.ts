// import { Outlet } from "@data/outlet/models/outlet-model";
// import { Request, Response, NextFunction } from "express";
// import ApiError from "@presentation/error-handling/api-error";

// const verifyOutlet = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<any> => {
//   try {
//     let outletIdHeader;

//     console.log("accessLevel", req.user.accessLevel);

//     if (req.headers.outletid) {
//       outletIdHeader = req.headers.outletid;
//     } else {
//       outletIdHeader = req.user.outlet[0];
//     }

//     if (outletIdHeader) {
//       const outletToCheck = outletIdHeader;
//       const outlet = await Outlet.findOne({ _id: outletToCheck });

//       if (outlet) {
//         req.outletId = outletIdHeader;

//         next(); // User found, proceed to the next middleware or route handler.
//       } else {
//         const unAuthorized = ApiError.unAuthorized();
//         return res
//           .status(unAuthorized.status)
//           .json({ message: unAuthorized.message });
//       }
//     } else {
//       const unAuthorized = ApiError.unAuthorized();
//       return res
//         .status(unAuthorized.status)
//         .json({ message: unAuthorized.message });
//     }
//   } catch (error) {
//     const internalError = ApiError.internalError();
//     return res
//       .status(internalError.status)
//       .json({ message: internalError.message });
//   }
// };

// export { verifyOutlet };

/* ======================New Middleware================== */

import { Outlet } from "@data/outlet/models/outlet-model";
import { Request, Response, NextFunction } from "express";
import ApiError from "@presentation/error-handling/api-error";

const verifyOutlet = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Fetches the outlet IDs from the database
    const outletIdsArray = await Outlet.find().distinct("_id");
    // Determines the outlet ID based on the request headers or user's access level
    let outletIdHeader =
      req.headers.outletid ||
      (req.user.accessLevel === "Superadmin"
        ? outletIdsArray[0]
        : req.user.outlet[0]);
        
    // Checks if the determined outlet ID is valid
    if (!outletIdsArray.find((id) => id.equals(outletIdHeader))) {
      // Responds with an unauthorized error if the outlet ID is invalid
      const unAuthorized = ApiError.unAuthorized();
      return res
        .status(unAuthorized.status)
        .json({ message: unAuthorized.message });
    }
    // Sets the outlet ID in the request object
    req.outletId = outletIdHeader;
    next(); // Proceed to the next middleware or route handler.
  } catch (error) {
    // Handles internal server errors and responds with an appropriate error message
    const internalError = ApiError.internalError();
    return res
      .status(internalError.status)
      .json({ message: internalError.message });
  }
};

export { verifyOutlet };
