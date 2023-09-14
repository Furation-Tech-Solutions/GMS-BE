import Joi from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

const clientTagCategoryValidator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  color: Joi.string().required(),
  classification: Joi.object({
    global: Joi.boolean(),
    local: Joi.boolean(),
  }),
  vip: Joi.boolean(),
  display: Joi.object({
    visible_to_superusers_only: Joi.boolean(),
    show_on_chit: Joi.boolean(),
    show_on_reservation_summary: Joi.boolean(),
  }),
  followers: Joi.array().items(Joi.string()), // Assuming followers are represented by user IDs
  tags: Joi.array().items(Joi.string()),
  createdAt: Joi.date(),
});

export const validateClientTagCategoryInputMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the client tag category input using the clientTagCategoryValidator
    const { error, value } = clientTagCategoryValidator.validate(body, {
      abortEarly: false,
    });

    if (error) {
      // Create an array of validation error messages
      const validationErrors = error.details.map((error) => error.message);

      throw new ApiError(
        ApiError.badRequest().status,
        validationErrors.join(", "),
        "ValidationError"
      );
    }

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json(error.message);
    }

    // Respond with the custom error
    const err = ApiError.badRequest();
    return res.status(err.status).json(err.message);
  }
};
