import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface BookingRequestInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialInstructions?: string;
  reservationDate?: string;
  reservationTime?: string;
  numberOfGuest?: number;
  duration?: string;
  status?: string;
}

const bookingRequestValidator = (
  input: BookingRequestInput,
  isUpdate: boolean = false
) => {
  const bookingRequestSchema = Joi.object<BookingRequestInput>({
    firstName: isUpdate
      ? Joi.string().max(30).min(3).optional().trim().messages({
        "string.max": "First name should have less than 30 characters",
        "string.min": "First name should have more than 3 characters",
      })
      : Joi.string().max(30).min(3).required().trim().messages({
        "string.max": "First name should have less than 30 characters",
        "string.min": "First name should have more than 3 characters",
        "any.required": "First name is required",
      }),

    lastName: isUpdate
      ? Joi.string().max(30).min(3).optional().trim().messages({
        "string.max": "Last name should have less than 30 characters",
        "string.min": "Last name should have more than 3 characters",
      })
      : Joi.string().max(30).min(3).required().trim().messages({
        "string.max": "Last name should have less than 30 characters",
        "string.min": "Last name should have more than 3 characters",
        "any.required": "Last name is required",
      }),

    email: isUpdate
      ? Joi.string().email().optional().trim().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      })
      : Joi.string().email().required().trim().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      }),

    phone: isUpdate
      ? Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .optional()
        .trim()
        .messages({
          "string.length": "Phone number should have exactly 10 digits",
          "string.pattern.base": "Phone number should contain only digits",
          "any.required": "Phone number is required",
        })
      : Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required()
        .trim()
        .messages({
          "string.length": "Phone number should have exactly 10 digits",
          "string.pattern.base": "Phone number should contain only digits",
          "any.required": "Phone number is required",
        }),

    specialInstructions: isUpdate
      ? Joi.string().max(2000).optional().trim().messages({
        "string.max": "Special instructions should have less than 2000 characters",
      })
      : Joi.string().max(2000).required().trim().messages({
        "string.max": "Special instructions should have less than 2000 characters",
      }),

    reservationDate: isUpdate ? Joi.string().optional().trim() : Joi.string().optional().trim(),

    reservationTime: isUpdate ? Joi.string().optional().trim() : Joi.string().optional().trim(),

    numberOfGuest: isUpdate
      ? Joi.number().integer().optional().messages({
        "number.integer": "Number of guests should be an integer",
      })
      : Joi.number().integer().optional().messages({
        "number.integer": "Number of guests should be an integer",
      }),

    duration: Joi.string().optional().trim(),
  });

  const { error, value } = bookingRequestSchema.validate(input, {
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

export const validateBookingRequestInputMiddleware = (
  isUpdate: boolean = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;

      // Validate the booking request input using the bookingRequestValidator
      const validatedInput: BookingRequestInput = bookingRequestValidator(
        body,
        isUpdate
      );

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
