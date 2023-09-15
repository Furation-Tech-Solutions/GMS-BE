import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface ClientTagInput {
  name: string;
  categoryNameId: mongoose.Schema.Types.ObjectId;
}

const clientTagValidator = (input: ClientTagInput, isUpdate: boolean = false) => {
  const clientTagSchema = Joi.object<ClientTagInput>(
    {
      name: isUpdate
        ? Joi.string().min(3).max(30).optional().trim().messages({
          "string.min": "Name should have at least 3 characters",
          "string.max": "Name should have less than 30 characters",
        })
        : Joi.string().min(3).max(30).required().trim().messages({
          "string.min": "Name should have at least 3 characters",
          "string.max": "Name should have less than 30 characters",
          "any.required": "Name is required",
        }),

      categoryNameId: Joi.string()
        .trim()
        .required()
        .messages({
          "any.required": "Category name ID is required",
        }),
    }
  );

  const { error, value } = clientTagSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const validationErrors: string[] = error.details.map(
      (err: ValidationErrorItem) => err.message
    );
    throw new ApiError(
      ApiError.badRequest().status,
      validationErrors.join(", "),
      "ValidationError"
    );
  }

  return value;
};

export const validateClientTagInputMiddleware = (isUpdate: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;

      // Validate the client tag input using the clientTagValidator
      const validatedInput: ClientTagInput = clientTagValidator(body, isUpdate);

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
};
