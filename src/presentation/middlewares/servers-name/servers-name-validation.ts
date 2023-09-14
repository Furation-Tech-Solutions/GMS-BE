import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface ServersNameInput {
  server_name: string;
}

const serversNameValidator = (input: ServersNameInput, isUpdate: boolean = false) => {
  const schema = Joi.object<ServersNameInput>({
    server_name: Joi.string().trim().required().messages({
      "string.base": "server_name must be a string",
      "string.empty": "server_name is required",
      "any.required": "server_name is required",
    }),
  });

  const { error, value } = schema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const validationErrors: string[] = error.details.map((err: ValidationErrorItem) => err.message);
    throw new ApiError(
      ApiError.badRequest().status,
      validationErrors.join(", "),
      "ValidationError"
    );
  }

  return value;
};

export const validateServersNameInputMiddleware = (isUpdate: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;

      // Validate the input using the bookedByNameValidator
      const validatedInput: ServersNameInput = serversNameValidator(body, isUpdate);

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
