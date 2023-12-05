import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { objectIdPattern } from "../add-reservation/add-reservation-validator";

interface GuestInput {
  firstName: string;
  lastName: string;
  email: string;
  confirmationMailSending: boolean;
  date: string;
  bookedBy: { _id: mongoose.Schema.Types.ObjectId; name: string };
  additionalGuest?: string[];
  reservationTags?: mongoose.Schema.Types.ObjectId[];
  status?: string;
  notes?: string;
  outletId?: string;
  updatedBy?: string;
  createdBy?: string;
}

const customDateValidator = (fieldName: string) => {
  return Joi.string()
    .custom((value, helpers) => {
      // Check if the date string has the correct length (yyyy-mm-dd)
      if (value.length === 10) {
        const parts = value.split("-");
        const yyyy = parseInt(parts[0], 10);
        const mm = parseInt(parts[1], 10);
        const dd = parseInt(parts[2], 10);
        const currentYear = new Date().getFullYear();

        if (yyyy <= currentYear && mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31) {
          return value;
        }
      }

      return helpers.error(`${fieldName}.dateInvalid`);
    })
    .messages({
      [`${fieldName}.dateInvalid`]: `Invalid ${fieldName} format. Please use a valid date (yyyy-mm-dd) with a year not greater than the current year, a month between 1 and 12, and a day between 1 and 31.`,
    });
};

const guestValidator = (input: GuestInput, isUpdate: boolean = false) => {
  const guestSchema = Joi.object<GuestInput>({
    firstName: isUpdate
      ? Joi.string().max(30).min(1).optional().trim().messages({
          "string.max": "First name should have less than 30 characters",
          "string.min": "First name should have more than 1 characters",
        })
      : Joi.string().max(30).min(1).required().trim().messages({
          "string.max": "First name should have less than 30 characters",
          "string.min": "First name should have more than 1 characters",
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
      ? Joi.string().email().optional().allow("").trim().messages({
          "string.email": "Invalid email format",
          // "any.required": "Email is required",
        })
      : Joi.string().email().optional().allow("").trim().messages({
          "string.email": "Invalid email format",
          "any.required": "Email is required",
        }),
    confirmationMailSending: isUpdate
      ? Joi.boolean().optional().messages({
          "any.required": "Confirmation mail sending status is required",
        })
      : Joi.boolean().optional().default(false).messages({
          "any.required": "Confirmation mail sending status is required",
        }),
    date: isUpdate
      ? customDateValidator("date").optional()
      : customDateValidator("date").required(),

    bookedBy: isUpdate
      ? Joi.object({
          _id: Joi.string().trim().optional().allow("").messages({
            "any.required": "Please specify _id in bookedBy",
          }),
          name: Joi.string().trim().optional().allow("").messages({
            "any.required": "Please specify name in bookedBy",
          }),
        })
      : Joi.object({
          _id: Joi.string().trim().required().allow("").default("").messages({
            "any.required": "Please specify _id in bookedBy",
          }),
          name: Joi.string().trim().required().allow("").default("").messages({
            "any.required": "Please specify name in bookedBy",
          }),
        })
          .optional()
          .messages({
            "object.base": "Booked by must be an object with _id and name",
          }),

    additionalGuest: isUpdate
      ? Joi.array().items(Joi.string().max(30).trim()).optional().messages({
          "array.base": "Additional guests must be an array of strings",
        })
      : Joi.array().items(Joi.string().max(30).trim()).optional().messages({
          "array.base": "Additional guests must be an array of strings",
        }),

    reservationTags: isUpdate
      ? Joi.array().items(Joi.string().trim()).optional().messages({
          "array.base": "Reservation tags must be an array of strings",
        })
      : Joi.array().items(Joi.string().trim()).optional().messages({
          "array.base": "Reservation tags must be an array of strings",
        }),

    status: isUpdate
      ? Joi.string()
          .valid("Checked In", "Checked Out", "No Status")
          .optional()
          .trim()
          .messages({
            "any.only": "Invalid status value",
          })
      : Joi.string()
          .valid("Checked In", "Checked Out", "No Status")
          .optional()
          .default("No Status")
          .trim()
          .messages({
            "any.only": "Invalid status value",
          }),

    notes: isUpdate
      ? Joi.string().optional().allow("").trim()
      : Joi.string().optional().allow("").trim(),
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

  const { error, value } = guestSchema.validate(input, {
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

export const validateGuestInputMiddleware = (isUpdate: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;

      // Validate the guest input using the guestValidator
      const validatedInput: GuestInput = guestValidator(body, isUpdate);

      // Continue to the next middleware or route handler
      next();
    } catch (error: any) {
      // if (error instanceof ApiError) {
      //     return res.status(error.status).json(error.message);
      // }

      // Respond with the custom error
      // const err = ApiError.badRequest();
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};
