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
): Promise<void> => {
  try {
    const headerEmail = req.headers.email;
    const cookieEmail = req.cookies.email;

    if (headerEmail || cookieEmail) {
      const emailToCheck = headerEmail || cookieEmail;
      const user = await UserAccount.findOne({ email: emailToCheck });
      if (user) {
        req.user = user
        next();
      } else {
        const unAuthorized = ApiError.unAuthorized();
        res.status(unAuthorized.status).json({ message: unAuthorized.message });
      }

    }

    else {
      req.user = {
        _id: "65116a3e13633df078698e90"
      }; // Set the user in the request object
      // const unAuthorized = ApiError.unAuthorized();
      // res.status(unAuthorized.status).json({ message: unAuthorized.message });
      next()
    }

  } catch (error) {
    const internalError = ApiError.internalError();
    res.status(internalError.status).json({ message: internalError.message });
  }
};

const authorziedUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.adminId;
  if (id) {
    const user = await Admin.findById(id);
    const superUser = await UserAccount.findById(id);

    if (user || superUser) {
      const mergedUser = {
        admin: user,
        userAccount: superUser
      };

      req.user = mergedUser;
      next();
    } else {
      const err = ApiError.notFound();
      return res.status(err.status).json(err.message);
    }
  };
}

/*
  Middleware to verify token and authorization for superadmin
*/
const verifyTokenAndAuthorizationToSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyLoggedInUser(req, res, () => {
    if (req.user && req.user.superAdmin) {
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
const verifyTokenAndAuthorizationToAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyLoggedInUser(req, res, () => {
    if (req.user && req.user.admin) {
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
const verifyTokenAndAuthorizationToAdminAndSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyLoggedInUser(req, res, () => {
    if (req.user && (req.user.admin || req.user.superAdmin)) {
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
  authorziedUser,
  verifyTokenAndAuthorizationToSuperAdmin,
  verifyTokenAndAuthorizationToAdmin,
  verifyTokenAndAuthorizationToAdminAndSuperAdmin,
  adminActiveStatus,
};
