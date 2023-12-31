import { NextFunction, Request, Response } from "express";
import {
    ClientTagEntity,
    ClientTagMapper,
    ClientTagModel,
} from "@domain/client-tag/entities/client-tag-entities"; // Import tag category-related entities and mapper
import { CreateClientTagUsecase } from "@domain/client-tag/usecases/create-client-tag"; // Import tag category-related use cases
import { DeleteClientTagUsecase } from "@domain/client-tag/usecases/delete-client-tag";
import { GetClientTagByIdUsecase } from "@domain/client-tag/usecases/get-client-tag-by-id";
import { GetAllClienttagUsecase } from "@domain/client-tag/usecases/get-all-client-tag";
import { UpdateClientTagUsecase } from "@domain/client-tag/usecases/update-client-tag";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class ClientTagServices {
    private readonly createClientTagUsecase: CreateClientTagUsecase;
    private readonly deleteClientTagUsecase: DeleteClientTagUsecase;
    private readonly getClientTagByIdUsecase: GetClientTagByIdUsecase;
    private readonly getAllClienttagUsecase: GetAllClienttagUsecase;
    private readonly updateClientTagUsecase: UpdateClientTagUsecase;

    constructor(
        createClientTagUsecase: CreateClientTagUsecase,
        deleteClientTagUsecase: DeleteClientTagUsecase,
        getClientTagByIdUsecase: GetClientTagByIdUsecase,
        getAllClienttagUsecase: GetAllClienttagUsecase,
        updateClientTagUsecase: UpdateClientTagUsecase,
    ) {
        this.createClientTagUsecase = createClientTagUsecase;
        this.deleteClientTagUsecase = deleteClientTagUsecase;
        this.getClientTagByIdUsecase = getClientTagByIdUsecase;
        this.getAllClienttagUsecase = getAllClienttagUsecase;
        this.updateClientTagUsecase = updateClientTagUsecase;
    }

    async createClientTag(req: Request, res: Response): Promise<void> {
        const user=req.user
        const outletId=req.outletId
        const newClientTagData={
            ...req.body,
            outletId:outletId,
            createdBy:user._id,
            updatedBy:user._id
        }
        const clientTagData: ClientTagModel = ClientTagMapper.toModel(newClientTagData);

        const newClientTag: Either<ErrorClass, ClientTagEntity> =
            await this.createClientTagUsecase.execute(clientTagData);

        newClientTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ClientTagEntity) => {
                const resData = ClientTagMapper.toEntity(result, true);
                return res.status(200).json(resData);
            }
        );
    }

    async deleteClientTag(req: Request, res: Response): Promise<void> {
        const clientTagId: string = req.params.ClientTagId;

        const deletedClientTag: Either<ErrorClass, void> =
            await this.deleteClientTagUsecase.execute(clientTagId);

        deletedClientTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                return res.status(200).json({ message: "Client Tag deleted successfully." });
            }
        );
    }

    async getClientTagById(req: Request, res: Response): Promise<void> {
        const clientTagId: string = req.params.ClientTagId;

        const clientTag: Either<ErrorClass, ClientTagEntity> =
            await this.getClientTagByIdUsecase.execute(clientTagId);

        clientTag.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ClientTagEntity) => {
                if (!result) {
                    return res.status(404).json({ message: "Client Tag not found." });
                }
                const resData = ClientTagMapper.toEntity(result);
                return res.status(200).json(resData);
            }
        );
    }

    async getAllClientTags(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const outletId=req.outletId as string
        const clientTags: Either<ErrorClass, ClientTagEntity[]> =
            await this.getAllClienttagUsecase.execute(outletId);

        clientTags.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: ClientTagEntity[]) => {
                const responseData = result.map((tag) =>
                    ClientTagMapper.toEntity(tag)
                );
                return res.status(200).json(responseData);
            }
        );
    }

    async updateClientTag(req: Request, res: Response): Promise<void> {
        const clientTagId: string = req.params.ClientTagId;
        const user=req.user
        const newClientTagData={
            ...req.body,
            updatedBy:user._id
        }
        const clientTagData: ClientTagModel = newClientTagData;

        const existingClientTag: Either<ErrorClass, ClientTagEntity> =
            await this.getClientTagByIdUsecase.execute(clientTagId);

        existingClientTag.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (clientTagData: ClientTagEntity) => {
                const updatedClientTagEntity: ClientTagEntity = ClientTagMapper.toEntity(
                    clientTagData,
                    true,
                    clientTagData
                );

                const updatedClientTag: Either<ErrorClass, ClientTagEntity> =
                    await this.updateClientTagUsecase.execute(
                        clientTagId,
                        updatedClientTagEntity
                    );

                updatedClientTag.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (result: ClientTagEntity) => {
                        const resData = ClientTagMapper.toEntity(result, true);
                        res.status(200).json(resData);
                    }
                );
            }
        );
    }
}








