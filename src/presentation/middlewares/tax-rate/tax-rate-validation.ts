import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface TaxRateInput {
  type: string;
  percentage: number;
}

const taxRateValidator = (input: TaxRateInput, isUpdate: boolean = false) => {
  const schema = Joi.object<TaxRateInput>({
    type: isUpdate
      ? Joi.string().trim().optional().messages({
          "string.empty": "Type can't be empty",
        })
      : Joi.string().trim().required().messages({
          "string.base": "Type must be a string",
          "string.empty": "Type is required",
          "any.required": "Type is required",
        }),
    percentage: isUpdate
      ? Joi.number().min(0).max(100).optional().messages({
          "number.base": "Percentage must be a number",
          "number.min": "Percentage should be at least 0",
          "number.max": "Percentage should be at most 100",
        })
      : Joi.number().min(0).max(100).required().messages({
          "number.base": "Percentage must be a number",
          "number.min": "Percentage should be at least 0",
          "number.max": "Percentage should be at most 100",
          "any.required": "Percentage is required",
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

export const validateTaxRateInputMiddleware = (isUpdate: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;

      // Validate the input using the taxRateValidator
      const validatedInput: TaxRateInput = taxRateValidator(body, isUpdate);

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