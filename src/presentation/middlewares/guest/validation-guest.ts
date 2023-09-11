import Joi from "joi";
import ApiError from "@presentation/error-handling/api-error";
import { Request, Response, NextFunction } from "express";

const guestModelSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    // Add other properties and validations for the GuestModel here
});

export const validateGuestModelInputMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Extract the request body
        const { body } = req;

        // Validate the guest model input using the guestModelSchema
        const { error } = guestModelSchema.validate(body, { abortEarly: false });

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
