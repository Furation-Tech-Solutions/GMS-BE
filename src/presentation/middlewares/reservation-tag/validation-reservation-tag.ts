import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { objectIdPattern } from "../add-reservation/add-reservation-validator";

interface ReservationTagInput {
  name: string;
  categoryNameId: mongoose.Schema.Types.ObjectId;
  outletId?:string;
  updatedBy?: string;
  createdBy?: string;
}

const reservationTagValidator = (
  input: ReservationTagInput,
  isUpdate: boolean = false
) => {
  const reservationTagSchema = Joi.object<ReservationTagInput>({
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

    categoryNameId: Joi.string().trim().required().messages({
      "any.required": "Category name ID is required",
    }),
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

  const { error, value } = reservationTagSchema.validate(input, {
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

export const validateReservationTagInputMiddleware = (
  isUpdate: boolean = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;

      // Validate the reservation tag input using the reservationTagValidator
      const validatedInput: ReservationTagInput = reservationTagValidator(
        body,
        isUpdate
      );

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
