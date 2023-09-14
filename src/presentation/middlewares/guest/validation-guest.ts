import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface GuestInput {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    confirmationMailSending: boolean;
    bookedBy: mongoose.Schema.Types.ObjectId;
    additionalGuest?: string[];
    reservationTags?: mongoose.Schema.Types.ObjectId[];
    status?: string;
    notes?: string;
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
                "string.email": "Invalid email format"
                // "any.required": "Email is required",
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
                    "string.pattern.base": "Phone number should contain only digits"
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

        confirmationMailSending: isUpdate
            ? Joi.boolean().optional().messages({
                "any.required": "Confirmation mail sending status is required",
            })
            : Joi.boolean().required().messages({
                "any.required": "Confirmation mail sending status is required",
            }),

        bookedBy: isUpdate
            ? Joi.string().trim().optional().messages({
                "string.base": "Booking user ID must be a string",
                "string.empty": "Booking user ID is required",
            })
            : Joi.string().trim().required().messages({
                "string.base": "Booking user ID must be a string",
                "string.empty": "Booking user ID is required",
                "any.required": "Booking user ID is required",
            }),

        additionalGuest: isUpdate
            ? Joi.array()
                .items(Joi.string().max(30).trim())
                .optional()
                .messages({
                    "array.base": "Additional guests must be an array of strings",
                })
            : Joi.array()
                .items(Joi.string().max(30).trim())
                .optional()
                .messages({
                    "array.base": "Additional guests must be an array of strings",
                }),

        reservationTags: isUpdate
            ? Joi.array()
                .items(Joi.string().trim())
                .optional()
                .messages({
                    "array.base": "Reservation tags must be an array of strings",
                })
            : Joi.array()
                .items(Joi.string().trim())
                .optional()
                .messages({
                    "array.base": "Reservation tags must be an array of strings",
                }),

        status: isUpdate
            ? Joi.string()
                .valid("checked In", "checked Out", "-")
                .optional()
                .trim()
                .messages({
                    "any.only": "Invalid status value",
                })
            : Joi.string()
                .valid("checked In", "checked Out", "-")
                .optional()
                .trim()
                .messages({
                    "any.only": "Invalid status value",
                }),

        notes: isUpdate
            ? Joi.string()
                .max(500)
                .min(10)
                .optional()
                .trim()
                .messages({
                    "string.max": "Notes should have less than 500 characters",
                    "string.min": "Notes should have more than 10 characters",
                })
            : Joi.string()
                .max(500)
                .min(10)
                .optional()
                .trim()
                .messages({
                    "string.max": "Notes should have less than 500 characters",
                    "string.min": "Notes should have more than 10 characters",
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
