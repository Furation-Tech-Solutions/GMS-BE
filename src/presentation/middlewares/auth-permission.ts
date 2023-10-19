import { Request, Response, NextFunction } from 'express';
import ApiError, { ErrorClass } from '@presentation/error-handling/api-error';
import { UserAccount } from '@data/user-account/models/user-account-model';

// Import your middleware functions
import {
  verifyAuthorizationToSuperUser,
  verifyAuthorizationToManager,
  verifyAuthorizationToSubManager,
  verifyLoggedInUser,
} from './auth-middleware';

const selectAuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userAccessLevel = req.user ? req.user.accessLevel : null;

  if (userAccessLevel === 'Superuser') {
    verifyAuthorizationToSuperUser(req, res, next);
  } else if (userAccessLevel === 'Manager') {
    verifyAuthorizationToManager(req, res, next);
  } else if (userAccessLevel === 'Sub-Manager') {
    verifyAuthorizationToSubManager(req, res, next);
  } else {
    // Handle cases where the user's access level is not recognized or not provided.
    // You can return an error response or perform other actions as needed.
    // For example:
    res.status(403).json({ message: 'Unauthorized' });
  }
};

export const authorizedUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  verifyLoggedInUser(req, res, () => {
    selectAuthorizationMiddleware(req, res, next);
  });
};
