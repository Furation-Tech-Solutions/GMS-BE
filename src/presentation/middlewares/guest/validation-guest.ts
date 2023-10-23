import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface GuestInput {
  firstName: string;
  lastName: string;
  email: string;
  confirmationMailSending: boolean;
  bookedBy: { _id: mongoose.Schema.Types.ObjectId; name: string };
  additionalGuest?: string[];
  reservationTags?: mongoose.Schema.Types.ObjectId[];
  status?: string;
  notes?: string;
  updatedBy?: string;
  createdBy?: string;
}

const guestValidator = (input: GuestInput, isUpdate: boolean = false) => {
  const guestSchema = Joi.object<GuestInput>({
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
          // "any.required": "Email is required",
        })
      : Joi.string().email().required().trim().messages({
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

    // bookedBy: isUpdate
    //   ? Joi.object().optional().messages({
    //       "object.base": "Booking user ID must be a string",
    //       "object.empty": "Booking user ID is required",
    //     })
    //   : Joi.object().required().messages({
    //       "object.base": "Booking user ID must be a string",
    //       "object.empty": "Booking user ID is required",
    //       "any.required": "Booking user ID is required",
    //     }),
    bookedBy: isUpdate
      ? Joi.object({
          _id: Joi.string().trim().optional().messages({
            "any.required": "Please specify _id in bookedBy",
          }),
          name: Joi.string().trim().optional().messages({
            "any.required": "Please specify name in bookedBy",
          }),
        })
      : Joi.object({
          _id: Joi.string().trim().required().messages({
            "any.required": "Please specify _id in bookedBy",
          }),
          name: Joi.string().trim().required().messages({
            "any.required": "Please specify name in bookedBy",
          }),
        })
          .required()
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
      ? Joi.string().optional().trim()
      : Joi.string().optional().trim(),
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
