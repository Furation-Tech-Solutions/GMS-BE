import { NextFunction, Request, Response } from "express";
import {
    BookingRequestEntity,
    BookingRequestMapper,
    BookingRequestModel,
} from "@domain/bookingRequest/entities/bookingRequest_entities"; // Import booking request-related entities and mapper
import { CreateBookingRequestUsecase } from "@domain/bookingRequest/usecases/create-bookingReq"; // Import booking request-related use cases
import { DeleteBookingRequestUsecase } from "@domain/bookingRequest/usecases/delete-bookingRequest";
import { GetBookingRequestByIdUsecase } from "@domain/bookingRequest/usecases/get-bookingRequest-by-id";
import { GetAllBookingRequestsUsecase } from "@domain/bookingRequest/usecases/get-all-bookingrequest";
import { UpdateBookingRequestUsecase } from "@domain/bookingRequest/usecases/update-bookingReq";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class BookingRequestServices {
    private readonly createBookingRequestUsecase: CreateBookingRequestUsecase;
    private readonly deleteBookingRequestUsecase: DeleteBookingRequestUsecase;
    private readonly getBookingRequestByIdUsecase: GetBookingRequestByIdUsecase;
    private readonly getAllBookingRequestsUsecase: GetAllBookingRequestsUsecase;
    private readonly updateBookingRequestUsecase: UpdateBookingRequestUsecase;

    constructor(
        createBookingRequestUsecase: CreateBookingRequestUsecase,
        deleteBookingRequestUsecase: DeleteBookingRequestUsecase,
        getBookingRequestByIdUsecase: GetBookingRequestByIdUsecase,
        getAllBookingRequestsUsecase: GetAllBookingRequestsUsecase,
        updateBookingRequestUsecase: UpdateBookingRequestUsecase,
    ) {
        this.createBookingRequestUsecase = createBookingRequestUsecase;
        this.deleteBookingRequestUsecase = deleteBookingRequestUsecase;
        this.getBookingRequestByIdUsecase = getBookingRequestByIdUsecase;
        this.getAllBookingRequestsUsecase = getAllBookingRequestsUsecase;
        this.updateBookingRequestUsecase = updateBookingRequestUsecase;
    }

    async createBookingRequest(req: Request, res: Response): Promise<void> {
        const bookingRequestData: BookingRequestModel = BookingRequestMapper.toModel(req.body);

        const newBookingRequest: Either<ErrorClass, BookingRequestEntity> =
            await this.createBookingRequestUsecase.execute(bookingRequestData);

        newBookingRequest.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: BookingRequestEntity) => {
                const resData = BookingRequestMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }

    async deleteBookingRequest(req: Request, res: Response): Promise<void> {
        const requestID: string = req.params.requestId;

        const deletedBookingRequest: Either<ErrorClass, void> =
            await this.deleteBookingRequestUsecase.execute(requestID);

        deletedBookingRequest.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                return res.json({ message: "Booking request deleted successfully." });
            }
        );
    }

    async getBookingRequestById(req: Request, res: Response): Promise<void> {
        const requestID: string = req.params.requestId;

        const bookingRequest: Either<ErrorClass, BookingRequestEntity> =
            await this.getBookingRequestByIdUsecase.execute(requestID);

        bookingRequest.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: BookingRequestEntity) => {
                if (result == undefined) {
                    return res.json({ message: "Data Not Found" });
                }
                const resData = BookingRequestMapper.toEntity(result);
                return res.json(resData);
            }
        );
    }

    async getAllBookingRequests(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const bookingRequests: Either<ErrorClass, BookingRequestEntity[]> =
            await this.getAllBookingRequestsUsecase.execute();

        bookingRequests.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: BookingRequestEntity[]) => {
                const responseData = result.map((bookingRequest) =>
                    BookingRequestMapper.toEntity(bookingRequest)
                );
                return res.json(responseData);
            }
        );
    }

    async updateBookingRequest(req: Request, res: Response): Promise<void> {
        const requestID: string = req.params.requestId;
        const bookingRequestData: BookingRequestModel = req.body;

        const existingBookingRequest: Either<ErrorClass, BookingRequestEntity> =
            await this.getBookingRequestByIdUsecase.execute(requestID);

        existingBookingRequest.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (existingBookingRequestData: BookingRequestEntity) => {
                const updatedBookingRequestEntity: BookingRequestEntity = BookingRequestMapper.toEntity(
                    bookingRequestData,
                    true,
                    existingBookingRequestData
                );

                const updatedBookingRequest: Either<ErrorClass, BookingRequestEntity> =
                    await this.updateBookingRequestUsecase.execute(
                        requestID,
                        updatedBookingRequestEntity
                    );

                updatedBookingRequest.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (result: BookingRequestEntity) => {
                        const resData = BookingRequestMapper.toEntity(result, true);
                        res.json(resData);
                    }
                );
            }
        );
    }
}
