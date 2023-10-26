import admin from "@main/config/firebase-sdk/firebase-config";
import { Admin } from "@data/admin/models/admin-model";
import { Request, Response, NextFunction, RequestHandler } from "express";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { UserAccount } from "@data/user-account/models/user-account-model";

/*
  Middleware to verify Firebase token and set user in the request object
*/

const verifyLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const headerEmail = req.headers.email;
    const cookieEmail = req.cookies.email;

    if (headerEmail || cookieEmail) {
      const emailToCheck = headerEmail || cookieEmail;
      const user = await UserAccount.findOne({ email: emailToCheck });

      if (user) {
        req.user = user;
        next(); // User found, proceed to the next middleware or route handler.
      } else {
        const unAuthorized = ApiError.unAuthorized();
        return res
          .status(unAuthorized.status)
          .json({ message: unAuthorized.message });
      }
    } else {
      // If no email is found in headers or cookies, you can set a default user or proceed without setting req.user.
      // You can choose one of the following options:
      
      // 1. Set a default user:
      // req.user = {
      //   _id: "65116a3e13633df078698e90"
      // };
      // next();
      
      // 2. Send an unauthorized response and don't set req.user:
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

// const authorziedUser: RequestHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const id = req.params.adminId;
//   if (id) {
//     const user = await Admin.findById(id);
//     const superUser = await UserAccount.findById(id);

//     if (user || superUser) {
//       const mergedUser = {
//         admin: user,
//         userAccount: superUser
//       };

//       req.user = mergedUser;
//       next();
//     } else {
//       const err = ApiError.notFound();
//       return res.status(err.status).json(err.message);
//     }
//   };
// }

/*
  Middleware to verify token and authorization for superadmin
*/
const verifyAuthorizationToSuperUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyLoggedInUser(req, res, () => {
    if (req.user && req.user.accessLevel === "Superuser") {
      next();
    } else {
      const forbidden = ApiError.forbidden();
      res.status(forbidden.status).json({ message: forbidden.message });
    }
  });
};

/*
  Middleware to verify token and authorization for admin
*/
const verifyAuthorizationToManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyLoggedInUser(req, res, () => {
    if (req.user && req.user.accessLevel === "Manager") {
      next();
    } else {
      const forbidden = ApiError.forbidden();
      res.status(forbidden.status).json({ message: forbidden.message });
    }
  });
};

/*
  Middleware to verify token and authorization for admin or superadmin
*/
const verifyAuthorizationToSubManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyLoggedInUser(req, res, () => {
    if (req.user && req.user.accessLevel === "Sub-Manager") {
      next();
    } else {
      const forbidden = ApiError.forbidden();
      res.status(forbidden.status).json({ message: forbidden.message });
    }
  });
};

/*
  Middleware to check admin's active status
*/
const adminActiveStatus = (req: Request, res: Response, next: NextFunction) => {
  verifyLoggedInUser(req, res, () => {
    if (req.user && req.user.admin) {
      if (req.user.active) {
        next();
      } else {
        const forbidden = ApiError.forbidden();
        res.status(forbidden.status).json({ message: forbidden.message });
      }
    } else {
      const forbidden = ApiError.forbidden();
      res.status(forbidden.status).json({ message: forbidden.message });
    }
  });
};

export {
  verifyLoggedInUser,
  verifyAuthorizationToSuperUser,
  verifyAuthorizationToManager,
  verifyAuthorizationToSubManager,
  // authorziedUser,
  // verifyTokenAndAuthorizationToSuperAdmin,
  // verifyTokenAndAuthorizationToAdmin,
  // verifyTokenAndAuthorizationToAdminAndSuperAdmin,
  // adminActiveStatus,
};
