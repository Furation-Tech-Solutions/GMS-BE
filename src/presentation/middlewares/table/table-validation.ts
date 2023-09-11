import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface TableInput {
  tableNo: number;
  partySizeMini: number;
  partySizeMax: number;
  tableCombinations?: mongoose.Schema.Types.ObjectId[];
  seatingArea: mongoose.Schema.Types.ObjectId;
}

const tableValidator = (input: TableInput, isUpdate: boolean = false) => {
  const tableSchema = Joi.object<TableInput>({
    tableNo: isUpdate
      ? Joi.number().min(1).integer().optional().messages({
          "number.min": "Table number should be a positive integer",
          "number.integer": "Table number should be a positive integer",
        })
      : Joi.number().min(1).integer().required().messages({
          "number.base": "Table number must be a number",
          "number.min": "Table number should be a positive integer",
          "number.integer": "Table number should be a positive integer",
          "any.required": "Table number is required",
        }),
    partySizeMini: isUpdate
      ? Joi.number().min(1).integer().optional().messages({
          "number.min": "Party size minimum should be a positive integer",
          "number.integer": "Party size minimum should be a positive integer",
        })
      : Joi.number().min(1).integer().required().messages({
          "number.base": "Party size minimum must be a number",
          "number.min": "Party size minimum should be a positive integer",
          "number.integer": "Party size minimum should be a positive integer",
          "any.required": "Party size minimum is required",
        }),
    partySizeMax: isUpdate
      ? Joi.number()
          .min(Joi.ref("partySizeMini"))
          .integer()
          .optional()
          .messages({
            "number.min":
              "Party size maximum should be greater than or equal to the minimum party size",
            "number.integer": "Party size maximum should be a positive integer",
          })
      : Joi.number()
          .min(Joi.ref("partySizeMini"))
          .integer()
          .required()
          .messages({
            "number.base": "Party size maximum must be a number",
            "number.min":
              "Party size maximum should be greater than or equal to the minimum party size",
            "number.integer": "Party size maximum should be a positive integer",
            "any.required": "Party size maximum is required",
          }),
    tableCombinations: isUpdate
      ? Joi.array()
          .items(Joi.object({ mergeable_with: Joi.string().trim() }))
          .optional()
          .messages({
            "array.base": "Table combinations must be an array of objects",
          })
      : Joi.array()
          .items(Joi.object({ mergeable_with: Joi.string().trim() }))
          .optional()
          .messages({
            "array.base": "Table combinations must be an array of objects",
            "any.required": "Table combinations must be an array of objects",
          }),
    seatingArea: isUpdate
      ? Joi.string().trim().optional().messages({
          "string.empty": "Seating area ID is required",
        })
      : Joi.string().trim().required().messages({
          "string.base": "Seating area ID must be a string",
          "string.empty": "Seating area ID is required",
          "any.required": "Seating area ID is required",
        }),
  });

  const { error, value } = tableSchema.validate(input, {
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

export const validateTableInputMiddleware = (isUpdate: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;

      // Validate the table input using the tableValidator
      const validatedInput: TableInput = tableValidator(body, isUpdate);

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
