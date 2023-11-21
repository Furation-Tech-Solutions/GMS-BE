
import { Request, Response, NextFunction } from "express";
import ApiError from "@presentation/error-handling/api-error";
import { UserAccount } from "@data/user-account/models/user-account-model";


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
        next(); 
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



export {
  verifyLoggedInUser,
  verifyAuthorizationToSuperUser,
};
