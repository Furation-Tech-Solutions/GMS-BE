import admin from "@main/config/firebase-sdk/firebase-config";
import { Admin } from "@data/admin/models/admin-model";
import { Request, Response, NextFunction, RequestHandler } from "express";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

/*
  Middleware to verify Firebase token and set user in the request object
*/
const verifyFirebaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    //TODO: for amul : update this code in clean code

    // const { authorization } = req.headers;

    // if (authorization) {
    //   const idToken: string = authorization.split("Bearer ")[1];

    //   // Verify the Firebase token
    //   const decodedToken = await admin.auth().verifyIdToken(idToken);

    //   // Find the user in the database using the decoded email

    //   const user = await Admin.findOne({ email: decodedToken.email });

    //   req.user = user; // Set the user in the request objec
    // } else {
    //   const unAuthorized = ApiError.unAuthorized();
    //   res.status(unAuthorized.status).json({ message: unAuthorized.message });
    // }

    const { email } = req.body;

    if (email) {
      // Find the user in the database using the decoded email

      const user = await Admin.findOne({ email: email });

      req.user = user; // Set the user in the request objec
    } else {
      const unAuthorized = ApiError.unAuthorized();
      res.status(unAuthorized.status).json({ message: unAuthorized.message });
    }

    next();
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
    req.user = user;
    next();
  } else {
    const err = ApiError.notFound();
    return res.status(err.status).json(err.message);
  }
};

/*
  Middleware to verify token and authorization for superadmin
*/
const verifyTokenAndAuthorizationToSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyFirebaseToken(req, res, () => {
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
  verifyFirebaseToken(req, res, () => {
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
  verifyFirebaseToken(req, res, () => {
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
  verifyFirebaseToken(req, res, () => {
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
  authorziedUser,
  verifyTokenAndAuthorizationToSuperAdmin,
  verifyTokenAndAuthorizationToAdmin,
  verifyTokenAndAuthorizationToAdminAndSuperAdmin,
  adminActiveStatus,
};
