import { NextFunction, Request, Response } from "express";

import {
    SuperAdminModel,
    SuperAdminEntity,
    SuperAdminMapper,
} from "@domain/super-admin/entities/super-admin.entity";

import { CreateSuperAdminUsecase } from "@domain/super-admin/usecases/create-super-admin";
import { DeleteSuperAdminUsecase } from "@domain/super-admin/usecases/delete-super-admin";
import { GetSuperAdminByIdUsecase } from "@domain/super-admin/usecases/get-super-admin-by-id";
import { UpdateSuperAdminUsecase } from "@domain/super-admin/usecases/update-super-admin";
import { GetAllSuperAdminsUsecase } from "@domain/super-admin/usecases/get-all-super-admin";

import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export class SuperAdminService {
    private readonly createSuperAdminUsecase: CreateSuperAdminUsecase;
    private readonly deleteSuperAdminUsecase: DeleteSuperAdminUsecase;
    private readonly getSuperAdminByIdUsecase: GetSuperAdminByIdUsecase;
    private readonly updateSuperAdminUsecase: UpdateSuperAdminUsecase;
    private readonly getAllSuperAdminsUsecase: GetAllSuperAdminsUsecase;
    public internalError = ApiError.internalError()
    public deleteSuccess = ApiError.delete()

    constructor(
        createSuperAdminUsecase: CreateSuperAdminUsecase,
        deleteSuperAdminUsecase: DeleteSuperAdminUsecase,
        getSuperAdminByIdUsecase: GetSuperAdminByIdUsecase,
        updateSuperAdminUsecase: UpdateSuperAdminUsecase,
        getAllSuperAdminsUsecase: GetAllSuperAdminsUsecase
    ) {
        this.createSuperAdminUsecase = createSuperAdminUsecase;
        this.deleteSuperAdminUsecase = deleteSuperAdminUsecase;
        this.getSuperAdminByIdUsecase = getSuperAdminByIdUsecase;
        this.updateSuperAdminUsecase = updateSuperAdminUsecase;
        this.getAllSuperAdminsUsecase = getAllSuperAdminsUsecase;
    }



    async createSuperAdmin(req: Request, res: Response): Promise<void> {

        const superAdminData: SuperAdminModel = SuperAdminMapper.toModel(req.body);

        // Call the CreateAdminUsecase to create the admin
        const newSuperAdmin: Either<ErrorClass, SuperAdminEntity> =
            await this.createSuperAdminUsecase.execute(superAdminData);

        newSuperAdmin.cata((error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
            (result: SuperAdminEntity) => {
                const resData = SuperAdminMapper.toEntity(result, true);
                return res.json(resData);
            }
        )


    }

    async deleteSuperAdmin(req: Request, res: Response): Promise<void> {
        // try {
        const superAdminId: string = req.params.superAdminId;

        // Call the DeleteAdminUsecase to delete the admin
        const deleteSuperAdmin: Either<ErrorClass, void> = await this.deleteSuperAdminUsecase.execute(superAdminId);

        deleteSuperAdmin.cata((error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
            (result: void) => {
                const resData = this.deleteSuccess
                return res.json(resData);
            }
        )

    }

    async getSuperAdminById(req: Request, res: Response): Promise<void> {
        // try {
        const superAdminId: string = req.params.superAdminId;

        // Call the GetAdminByIdUsecase to get the admin by ID
        const superAdmin: Either<ErrorClass, SuperAdminEntity> = await this.getSuperAdminByIdUsecase.execute(
            superAdminId
        );

        superAdmin.cata((error: ErrorClass) =>
            res.status(error.status).json({ error: error.message }),
            (result: SuperAdminEntity) => {
                const resData = SuperAdminMapper.toModel(result)
                return res.json(resData);
            }
        )

    }

    async updateSuperAdmin(req: Request, res: Response): Promise<void> {

        const superAdminId: string = req.params.superAdminId;
        const superAdminData: SuperAdminModel = req.body;

        // Get the existing admin by ID
        const existingSuperAdmin: Either<ErrorClass, SuperAdminEntity> =
            await this.getSuperAdminByIdUsecase.execute(superAdminId);

        existingSuperAdmin.cata((error: ErrorClass) => {
            res.status(error.status).json({ error: error.message })
        },
            async (result: SuperAdminEntity) => {
                const resData = SuperAdminMapper.toEntity(result, true);
                const updatedSuperAdminEntity: SuperAdminEntity = SuperAdminMapper.toEntity(
                    superAdminData,
                    true,
                    resData
                );


                const updateSuperAdmin: Either<ErrorClass, SuperAdminEntity> =
                    await this.updateSuperAdminUsecase.execute(superAdminId, updatedSuperAdminEntity);

                updateSuperAdmin.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message })
                    },
                    (response: SuperAdminEntity) => {
                        const resData = SuperAdminMapper.toModel(response);

                        res.json(resData);
                    }
                )
            }
        );
    }


    async getAllSuperAdmins(req: Request, res: Response, next: NextFunction): Promise<void> {

            // Call the GetAllAdminsUsecase to get all admins
            const superAdmins: Either<ErrorClass, SuperAdminEntity[]> = 
            await this.getAllSuperAdminsUsecase.execute();

            superAdmins.cata(
                (error: ErrorClass) => {
                    res.status(error.status).json({ error: error.message })
                },
                (superAdmins: SuperAdminEntity[]) => {
                    const responseData = superAdmins.map((superAdmin) => SuperAdminMapper.toModel(superAdmin));
                    res.json(responseData);
                }
            );
    }
}
