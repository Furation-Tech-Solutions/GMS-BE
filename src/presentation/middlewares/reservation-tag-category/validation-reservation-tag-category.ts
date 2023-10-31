import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { objectIdPattern } from "../add-reservation/add-reservation-validator";

interface ReservationTagCategoryInput {
  name: string;
  color: string;
  classification: {
    global?: boolean;
    local?: boolean;
  };
  vip: boolean;
  display: {
    visible_to_superusers_only?: boolean;
    show_on_chit?: boolean;
    show_on_reservation_summary?: boolean;
  };
  followers?: mongoose.Schema.Types.ObjectId[];
  tags?: { name: string }[];
  outletId?: string;
  updatedBy?: string;
  createdBy?: string;
}

const reservationTagCategoryValidator = (
  input: ReservationTagCategoryInput,
  isUpdate: boolean = false
) => {
  const reservationTagCategorySchema = Joi.object<ReservationTagCategoryInput>({
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

    color: Joi.string().required().trim().messages({
      "any.required": "Color is required",
    }),

    classification: Joi.object({
      global: Joi.boolean().optional(),
      local: Joi.boolean().optional(),
    }).optional(),

    vip: Joi.boolean().required().messages({
      "any.required": "VIP status is required",
    }),

    display: Joi.object({
      visible_to_superusers_only: Joi.boolean().optional(),
      show_on_chit: Joi.boolean().optional(),
      show_on_reservation_summary: Joi.boolean().optional(),
    }).optional(),

    followers: Joi.array().items(Joi.string().trim()).optional().messages({
      "array.base": "Followers must be an array of strings",
    }),

    tags: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required().trim().messages({
            "any.required": "Tag name is required",
          }),
        })
      )
      .optional()
      .messages({
        "array.base": "Tags must be an array of objects",
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

  const { error, value } = reservationTagCategorySchema.validate(input, {
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

export const validateReservationTagCategoryInputMiddleware = (
  isUpdate: boolean = false
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;

      // Validate the reservation tag category input using the reservationTagCategoryValidator
      const validatedInput: ReservationTagCategoryInput =
        reservationTagCategoryValidator(body, isUpdate);

      // Continue to the next middleware or route handler
      next();
    } catch (error: any) {
      // if (error instanceof ApiError) {
      //     return res.status(error.status).json(error.message);
      // }

      // Respond with the custom error
      // const err = ApiError.badRequest();
      return res.status(500).json({ error: error.message });
    }
  };
};
