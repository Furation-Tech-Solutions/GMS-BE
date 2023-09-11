import { NextFunction, Request, Response } from "express";
import {
    GuestEntity,
    GuestMapper,
    GuestModel,
} from "@domain/guest/entities/guest_entities";

import { CreateGuestUsecase } from "@domain/guest/usecases/create-guest";
import { DeleteGuestUsecase } from "@domain/guest/usecases/delete-guest";
import { GetGuestByIdUsecase } from "@domain/guest/usecases/get-guests-by-id";
import { GetAllGuestsUsecase } from "@domain/guest/usecases/get-all-guests";
import { UpdateGuestUsecase } from "@domain/guest/usecases/update-guest";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class GuestServices {
    private readonly createGuestUsecases: CreateGuestUsecase;
    private readonly deleteGuestUsecases: DeleteGuestUsecase;
    private readonly getGuestByIdUsecases: GetGuestByIdUsecase;
    private readonly getAllGuestsUsecases: GetAllGuestsUsecase;
    private readonly updateGuestUsecases: UpdateGuestUsecase;

    constructor(
        createGuestUsecases: CreateGuestUsecase,
        deleteGuestUsecases: DeleteGuestUsecase,
        getGuestByIdUsecases: GetGuestByIdUsecase,
        getAllGuestsUsecases: GetAllGuestsUsecase,
        updateGuestUsecases: UpdateGuestUsecase,
    ) {
        (this.createGuestUsecases = createGuestUsecases),
            (this.deleteGuestUsecases = deleteGuestUsecases),
            (this.getGuestByIdUsecases = getGuestByIdUsecases),
            (this.getAllGuestsUsecases = getAllGuestsUsecases),
            (this.updateGuestUsecases = updateGuestUsecases);
    }

    async createGuest(req: Request, res: Response): Promise<void> {
        // Extract guest data from the request body and convert it to Guest Model
        // console.log(req.body);
        const guestData: GuestModel = GuestMapper.toModel(req.body);
        // console.log(guestData,"line-25");
        // Call the CreateGeaustUsecase to create the guest
        const newGuest: Either<ErrorClass, GuestEntity> =
            await this.createGuestUsecases.execute(guestData);
        newGuest.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: GuestEntity) => {
                const resData = GuestMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }

    async deleteGuest(req: Request, res: Response): Promise<void> {
        const guestID: string = req.params.guestId;
        // console.log(req.params,"a");
        // console.log(guestID,"b");

        // Call the DeleteGUestUsecase to get the Guest by ID and delete
        const deletedGuest: Either<ErrorClass, void> =
            await this.deleteGuestUsecases.execute(guestID);

        deletedGuest.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                // if (result == undefined) {
                //     return res.json({ message: "Data Not Found" });
                // }
                return res.json({ message: "Guest deleted successfully." });
            }
        );
    }
    async getGuestById(req: Request, res: Response): Promise<void> {
        const guestId: string = req.params.guestId;

        // Call the getGuestByIdUsecases to get the Guests by ID
        const guest: Either<ErrorClass, GuestEntity> =
            await this.getGuestByIdUsecases.execute(guestId);

        guest.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: GuestEntity) => {
                if (result == undefined) {
                    return res.json({ message: "Data Not Found" });
                }
                const resData = GuestMapper.toEntity(result);
                return res.json(resData);
            }
        );
    }

    async getAllGuests(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        // Call the getAllGuestsUsecases to get all Guests
        const guests: Either<ErrorClass, GuestEntity[]> =
            await this.getAllGuestsUsecases.execute();

        guests.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: GuestEntity[]) => {
                // Convert compnays from an array of guestsEntity to an array of plain JSON objects using CompanyMapper
                const responseData = result.map((guest) =>
                    GuestMapper.toEntity(guest)
                );
                // Send the admins as a JSON response
                return res.json(responseData);
            }
        );
    }

    async updateGuest(req: Request, res: Response): Promise<void> {
        const guestId: string = req.params.guestId;
        const guestData: GuestModel = req.body;

        // Get the existing guest by ID
        const existingGuest: Either<ErrorClass, GuestEntity> =
            await this.getGuestByIdUsecases.execute(guestId);

        existingGuest.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (existingGuestData: GuestEntity) => {
                // Convert GuestData from GuestModel to GuestEntity using GuestMapper
                const updatedGuestEntity: GuestEntity = GuestMapper.toEntity(
                    guestData,
                    true,
                    existingGuestData
                );

                // Call the UpdateGuestUsecase to update the guest
                const updatedGuest: Either<ErrorClass, GuestEntity> =
                    await this.updateGuestUsecases.execute(
                        guestId,
                        updatedGuestEntity
                    );

                updatedGuest.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (result: GuestEntity) => {
                        const resData = GuestMapper.toEntity(result, true);
                        res.json(resData);
                    }
                );
            }
        );
    }
}