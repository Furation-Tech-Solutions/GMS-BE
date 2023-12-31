import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { objectIdPattern } from "../add-reservation/add-reservation-validator";

interface TableInput {
  tableNo: string;
  partySizeMini: number;
  partySizeMax: number;
  tableCombinations?: mongoose.Schema.Types.ObjectId[];
  seatingArea: mongoose.Schema.Types.ObjectId;
  isBlocked?: boolean;
  outletId?: string;
  updatedBy?: string;
  createdBy?: string;
}

const tableValidator = (input: TableInput, isUpdate: boolean = false) => {
  const tableSchema = Joi.object<TableInput>({
    tableNo: isUpdate
      ? Joi.string().optional().empty("").default("0").messages({
          "string.empty": "Table number should not be empty",
        })
      : Joi.string().required().empty("").default("0").messages({
          "string.empty": "Table number is required",
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
    // tableCombinations: isUpdate
    //   ? Joi.array()
    //       .items(Joi.object({ mergeable_with: Joi.string().trim() }))
    //       .optional()
    //       .messages({
    //         "array.base": "Table combinations must be an array of objects",
    //       })
    //   : Joi.array()
    //       .items(Joi.object({ mergeable_with: Joi.string().trim() }))
    //       .optional()
    //       .messages({
    //         "array.base": "Table combinations must be an array of objects",
    //         "any.required": "Table combinations must be an array of objects",
    //       }),
    tableCombinations: isUpdate
      ? Joi.array().items(Joi.string().trim()).optional().messages({
          "array.base": "Table combinations must be an array of strings",
        })
      : Joi.array().items(Joi.string().trim()).optional().messages({
          "array.base": "Table combinations must be an array of strings",
          "any.required": "Table combinations must be an array of strings",
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
    isBlocked: isUpdate
      ? Joi.boolean().optional().default(false)
      : Joi.boolean().optional().default(false),
    outletId: isUpdate
      ? Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .messages({
            "any.required": "Please select the outlet Id",
          })
      : Joi.string()
          .trim()
          .pattern(objectIdPattern, "MongoDB ObjectId")
          .optional()
          .allow("")
          .messages({
            "any.required": "Please select the outlet id",
          }),
    updatedBy: isUpdate
      ? Joi.string().trim().optional().messages({
          "any.required": "Please select the Updated By",
        })
      : Joi.string().trim().optional().messages({
          "any.required": "Please select the Update By",
        }),
    createdBy: isUpdate
      ? Joi.string().trim().optional().messages({
          "any.required": "Please select the Created By",
        })
      : Joi.string().trim().optional().messages({
          "any.required": "Please select the Created By",
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
    } catch (error: any) {
      // if (error instanceof ApiError) {
      //   return res.status(error.status).json(error.message);
      // }

      // Respond with the custom error
      // const err = ApiError.badRequest();
      return res.status(500).json({ error: error.message });
    }
  };
};
