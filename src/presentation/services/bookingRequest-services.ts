import { NextFunction, Request, Response } from "express";
import {
    BookingRequestEntity,
    BookingRequestMapper,
    BookingRequestModel,
} from "@domain/bookingRequest/entities/bookingRequest_entities"; // Import bookingRequest-related entities and mapper
import { CreateBookingRequestUsecase } from "@domain/bookingRequest/usecases/create-bookingReq"; // Import bookingRequest-related use cases
import { DeleteBookingRequestUsecase } from "@domain/bookingRequest/usecases/delete-bookingRequest";
import { GetBookingRequestByIdUsecase } from "@domain/bookingRequest/usecases/get-bookingRequest-by-id";
import { GetAllBookingRequestsUsecase } from "@domain/bookingRequest/usecases/get-all-bookingrequest";
import { UpdateBookingRequestUsecase } from "@domain/bookingRequest/usecases/update-bookingReq";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class BookingRequestServices {
    private readonly createBookingRequestUsecases: CreateBookingRequestUsecase;
    private readonly deleteBookingRequestUsecases: DeleteBookingRequestUsecase;
    private readonly getBookingRequestByIdUsecases: GetBookingRequestByIdUsecase;
    private readonly getAllBookingRequestsUsecases: GetAllBookingRequestsUsecase;
    private readonly updateBookingRequestUsecases: UpdateBookingRequestUsecase;

    constructor(
        createBookingRequestUsecases: CreateBookingRequestUsecase,
        deleteBookingRequestUsecases: DeleteBookingRequestUsecase,
        getBookingRequestByIdUsecases: GetBookingRequestByIdUsecase,
        getAllBookingRequestsUsecases: GetAllBookingRequestsUsecase,
        updateBookingRequestUsecases: UpdateBookingRequestUsecase,
    ) {
        this.createBookingRequestUsecases = createBookingRequestUsecases;
        this.deleteBookingRequestUsecases = deleteBookingRequestUsecases;
        this.getBookingRequestByIdUsecases = getBookingRequestByIdUsecases;
        this.getAllBookingRequestsUsecases = getAllBookingRequestsUsecases;
        this.updateBookingRequestUsecases = updateBookingRequestUsecases;
    }

    async createBookingRequest(req: Request, res: Response): Promise<void> {
        const bookingrequestData: BookingRequestModel = BookingRequestMapper.toModel(req.body);

        const newBookingRequest: Either<ErrorClass, BookingRequestEntity> =
            await this.createBookingRequestUsecases.execute(bookingrequestData);

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
        const BookingRequestID: string = req.params.bookingRequestId;

        const deletedBookingRequest: Either<ErrorClass, void> =
            await this.deleteBookingRequestUsecases.execute(BookingRequestID);

        deletedBookingRequest.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {

                return res.json({ message: "Booking Request deleted successfully." });
            }
        );
    }

    async getBookingRequestById(req: Request, res: Response): Promise<void> {
        const BookingRequestID: string = req.params.bookingRequestId;
        const bookingRequest: Either<ErrorClass, BookingRequestEntity> =
            await this.getBookingRequestByIdUsecases.execute(BookingRequestID);

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
            await this.getAllBookingRequestsUsecases.execute();

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
        const BookingRequestID: string = req.params.bookingRequestId;
        const bookingRequestData: BookingRequestModel = req.body;

        const existingBookingRequest: Either<ErrorClass, BookingRequestEntity> =
            await this.getBookingRequestByIdUsecases.execute(BookingRequestID);

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
                    await this.updateBookingRequestUsecases.execute(
                        BookingRequestID,
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
