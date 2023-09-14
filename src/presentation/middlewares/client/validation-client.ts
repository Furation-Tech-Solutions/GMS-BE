import Joi from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

const clientValidator = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  salutation: Joi.string().valid("Mr.", "Mrs.", "Ms.", "Miss.", "Dr.").required(),
  jobTitle: Joi.string(),
  company: Joi.string(),
  profileNotes: Joi.string(),
  privateNotes: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  email: Joi.string().email().required(),
  altEmail: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/) // Assuming you want a specific format for phone numbers
    .required(),
  workPhone: Joi.string()
    .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/) // Assuming you want a specific format for phone numbers
    .min(10),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  pincode: Joi.string(),
  country: Joi.string(),
  contactInfoVisibilityOnlytoSuperUser: Joi.boolean().default(false),
  birthDate: Joi.date(),
  anniversaryDate: Joi.date(),
  visits: Joi.number().default(0),
  spends: Joi.number().default(0),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  createdAt: Joi.date(),
});

export const validateClientInputMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract the request body
    const { body } = req;

    // Validate the client input using the clientValidator
    const { error, value } = clientValidator.validate(body, { abortEarly: false });

    if (error) {
      // Create an array of validation error messages
      const validationErrors = error.details.map((error) => error.message);

      throw new ApiError(
        ApiError.badRequest().status,
        validationErrors.join(", "),
        "ValidationError"
      );
    }

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
