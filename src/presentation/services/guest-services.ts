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
import * as HttpStatus from "@presentation/error-handling/http-status";
import * as ErrorMessage from "@presentation/error-handling/message-error";

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
        const user = req.user
        const newGuestData = {
            ...req.body,
            createdBy: user._id,
            updatedBy: user._id
        }

        const guestData: GuestModel = GuestMapper.toModel(newGuestData);
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
        try {
            // Call the getAllGuestsUsecases to get all Guests
            const guests: Either<ErrorClass, GuestEntity[]> =
                await this.getAllGuestsUsecases.execute();
            guests.cata(
                (error: ErrorClass) =>
                    res.status(error.status).json({ error: error.message }),
                (result: GuestEntity[]) => {
                    const searchQuery = req.query.search as string; // Search query
                    const filterByDate = req.query.date as string; // Date filter
                    const filterByStatus = req.query.status as string; // Status filter
                    const filterSort = req.query.sort as string; // Status filter

                    // Converting the response into the  our Entity

                    let responseData = result.map((guest) =>
                        GuestMapper.toEntity(guest)
                    );

                    // Sorting the data according to the params  

                    filterSort === "1"
                        ? responseData.sort((a, b) => {
                            return (
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                            );
                        })
                        : responseData.sort((a, b) => {
                            return (
                                new Date(a.createdAt).getTime() -
                                new Date(b.createdAt).getTime()
                            );
                        });

                    // Filtering data by date 

                    if (filterByDate) {
                        responseData = responseData.filter((item) => {

                            // Convert both 'createdAt' and 'filterByDate' to Date objects
                            const createdAtDate = new Date(item.createdAt);
                            const filterDate = new Date(`${filterByDate}`);

                            // Compare the date to filter
                            return createdAtDate.toDateString() === filterDate.toDateString();
                        });
                    }

                    // Filtering data by status

                    if (filterByStatus) {
                        const statusString = filterByStatus as string; // Explicit type assertion
                        responseData = responseData.filter((item) =>

                            // compare the status converting into lowercase
                            item.status.toLowerCase() === statusString.toLowerCase()
                        );
                    }

                    // Search
                    if (searchQuery) { // if search query param founds

                        // regx parameter i is not case-sensitive, meaning it will match both lowercase and uppercase characters
                        const regex = new RegExp(searchQuery as string, 'i');
                        responseData = responseData.filter((item) => {
                            return (
                                regex.test(item.firstName) || //  It checks if the regular expression regex matches
                                regex.test(item.lastName) ||
                                regex.test(item.email)
                            );
                        });
                    }

                    if (!responseData || responseData.length === 0) {
                        return res.status(HttpStatus.NOT_FOUND).json({ message: ErrorMessage.NOT_FOUND });
                    }

                    return res.json(responseData);
                }
            );
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: ErrorMessage.INTERNAL_SERVER_ERROR });
        }
    }
    
    
    
    


    async updateGuest(req: Request, res: Response): Promise<void> {
        const guestId: string = req.params.guestId;
        const user = req.user
        const newGuestData = {
            ...req.body,
            updatedBy: user._id
        }
        const guestData: GuestModel = newGuestData;

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


    async getAllSearchedGuests(
        req: Request,
        res: Response,
    ): Promise<void> {
        console.log("firstName", "lastName", "email")
        const { firstName, lastName, email } = req.query;
        console.log(firstName, lastName, email)
        // Call the getAllGuestsUsecases to get all Guests
        const guests: Either<ErrorClass, GuestEntity[]> = await this.getAllGuestsUsecases.execute();
        console.log(guests)
        guests.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: GuestEntity[]) => {
                const filteredGuests = result.filter((guest) => {
                    const firstNameMatch = firstName
                        ? (guest.firstName as string).toLowerCase().includes(firstName as string)
                        : true;
                    const lastNameMatch = lastName
                        ? (guest.lastName as string).toLowerCase().includes(lastName as string)
                        : true;
                    const emailMatch = email
                        ? (guest.email as string).toLowerCase().includes(email as string)
                        : true;

                    return firstNameMatch && lastNameMatch && emailMatch;
                });

                const responseData = filteredGuests.map((guest) => GuestMapper.toEntity(guest));

                // Send the guests that match the search criteria as a JSON response
                return res.json(responseData);
            }
        );
    }
}