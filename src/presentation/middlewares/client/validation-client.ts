import Joi, { ValidationErrorItem } from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface ClientInput {
  firstName: string;
  lastName: string;
  salutation: string;
  jobTitle?: string;
  company?: string;
  profileNotes?: string;
  privateNotes?: string;
  tags?: string[];
  email: string;
  altEmail?: string;
  phone: string;
  workPhone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  contactInfoVisibilityOnlyToSuperUser?: boolean;
  birthDate?: Date;
  anniversaryDate?: Date;
  visits?: number;
  spends?: number;
  gender: string;
  updatedBy?: string;
  createdBy?: string;
}

const clientValidator = (input: ClientInput, isUpdate: boolean = false) => {
  const clientSchema = Joi.object<ClientInput>({
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

    salutation: isUpdate
      ? Joi.string()
        .valid("Mr.", "Mrs.", "Ms.", "Miss.", "Dr.")
        .optional()
        .trim()
        .messages({
          "any.only": "Invalid salutation value",
          // "any.required": "Salutation is required",
        })
      : Joi.string()
        .valid("Mr.", "Mrs.", "Ms.", "Miss.", "Dr.")
        .required()
        .trim()
        .messages({
          "any.only": "Invalid salutation value",
          "any.required": "Salutation is required",
        }),

    jobTitle: isUpdate
      ? Joi.string().max(255).optional().trim().messages({
        "string.max": "Job title should have less than 255 characters",
      })
      : Joi.string().max(255).optional().trim().messages({
        "string.max": "Job title should have less than 255 characters",
      }),

    company: isUpdate
      ? Joi.string().max(255).optional().trim().messages({
        "string.max": "Company name should have less than 255 characters",
      })
      : Joi.string().max(255).optional().trim().messages({
        "string.max": "Company name should have less than 255 characters",
      }),

    profileNotes: isUpdate
      ? Joi.string().max(500).optional().trim().messages({
        "string.max": "Profile notes should have less than 500 characters",
      })
      : Joi.string().max(500).optional().trim().messages({
        "string.max": "Profile notes should have less than 500 characters",
      }),

    privateNotes: isUpdate
      ? Joi.string().max(500).optional().trim().messages({
        "string.max": "Private notes should have less than 500 characters",
      })
      : Joi.string().max(500).optional().trim().messages({
        "string.max": "Private notes should have less than 500 characters",
      }),

    tags: isUpdate
      ? Joi.array().items(Joi.string().max(255).trim()).optional().messages({
        "array.base": "Tags must be an array of strings",
      })
      : Joi.array().items(Joi.string().max(255).trim()).optional().messages({
        "array.base": "Tags must be an array of strings",
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

    altEmail: isUpdate
      ? Joi.string().email().optional().trim().messages({
        "string.email": "Invalid alternative email format",
        "any.required": "Alternative email is required",
      })
      : Joi.string().email().optional().trim().messages({
        "string.email": "Invalid alternative email format",
        "any.required": "Alternative email is required",
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

    workPhone: isUpdate
      ? Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .optional()
        .trim()
        .messages({
          "string.length": "Work phone number should have exactly 10 digits",
          "string.pattern.base":
            "Work phone number should contain only digits",
        })
      : Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .optional()
        .trim()
        .messages({
          "string.length": "Work phone number should have exactly 10 digits",
          "string.pattern.base":
            "Work phone number should contain only digits",
        }),

    address: isUpdate
      ? Joi.string().max(500).optional().trim().messages({
        "string.max": "Address should have less than 500 characters",
      })
      : Joi.string().max(500).optional().trim().messages({
        "string.max": "Address should have less than 500 characters",
      }),
    city: isUpdate
      ? Joi.string().max(255).optional().trim().messages({
        "string.max": "City should have less than 255 characters",
      })
      : Joi.string().max(255).optional().trim().messages({
        "string.max": "City should have less than 255 characters",
      }),

    state: isUpdate
      ? Joi.string().max(255).optional().trim().messages({
        "string.max": "State should have less than 255 characters",
      })
      : Joi.string().max(500).optional().trim().messages({
        "string.max": "Address should have less than 500 characters",
      }),

    pincode: isUpdate
      ? Joi.string().max(20).optional().trim().messages({
        "string.max": "Pincode should have less than 20 characters",
      })
      : Joi.string().max(20).optional().trim().messages({
        "string.max": "Pincode should have less than 20 characters",
      }),

    country: isUpdate
      ? Joi.string().max(255).optional().trim().messages({
        "string.max": "Country should have less than 255 characters",
      })
      : Joi.string().max(255).optional().trim().messages({
        "string.max": "Country should have less than 255 characters",
      }),

    contactInfoVisibilityOnlyToSuperUser: isUpdate
      ? Joi.boolean().optional().default(false)
      : Joi.boolean().optional().default(false),

    birthDate: isUpdate ? Joi.date().optional() : Joi.date().optional(),

    anniversaryDate: isUpdate ? Joi.date().optional() : Joi.date().optional(),

    visits: isUpdate
      ? Joi.number().integer().optional().default(0)
      : Joi.number().integer().optional().default(0),

    spends: isUpdate
      ? Joi.number().optional().default(0)
      : Joi.number().optional().default(0),

    gender: isUpdate
      ? Joi.string()
        .valid("Male", "Female", "Other")
        .optional()
        .trim()
        .messages({
          "any.only": "Invalid gender value",
          "any.required": "Gender is required",
        })
      : Joi.string()
        .valid("Male", "Female", "Other")
        .required()
        .trim()
        .messages({
          "any.only": "Invalid gender value",
          "any.required": "Gender is required",
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

  const { error, value } = clientSchema.validate(input, {
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

export const validateClientInputMiddleware = (isUpdate: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the request body
      const { body } = req;

      // Validate the client input using the clientValidator
      const validatedInput: ClientInput = clientValidator(body, isUpdate);

      // Continue to the next middleware or route handler
      next();
    } catch (error: any) {
      // if (error instanceof ApiError) {
      //   return res.status(error.status).json(error.message);
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
