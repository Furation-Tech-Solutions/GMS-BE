// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { SuperAdminService } from "@presentation/services/super-admin-service";
import { SuperAdminDataSourceImpl } from "@data/super-admin/datasources/super-admin-data-source";
import { SuperAdminRepositoryImpl } from "@data/super-admin/repositories/super-admin-repository-impl";

import { 
    CreateSuperAdmin,
    DeleteSuperAdmin,
    GetSuperAdminById,
    GetAllSuperAdmins,
    UpdateSuperAdmin 
} from "@domain/super-admin/usecases/super-admin.root";
import { validateSuperAdminInputMiddleware } from "@presentation/middlewares/superadmin/superadmin-validation";



const mongooseConnection = mongoose.connection;

// Create an instance of the AdminDataSourceImpl and pass the mongoose connection
const superAdminDataSource = new SuperAdminDataSourceImpl(mongooseConnection);

// Create an instance of the AdminRepositoryImpl and pass the AdminDataSourceImpl
const superAdminRepository = new SuperAdminRepositoryImpl(superAdminDataSource);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createSuperAdminUsecase = new CreateSuperAdmin(superAdminRepository);
const deleteSuperAdminUsecase = new DeleteSuperAdmin(superAdminRepository);
const getSuperAdminByIdUsecase = new GetSuperAdminById(superAdminRepository);
const updateSuperAdminUsecase = new UpdateSuperAdmin(superAdminRepository);
const getAllSuperAdminsUsecase = new GetAllSuperAdmins(superAdminRepository);

// Initialize AdminService and inject required dependencies
const superAdminService = new SuperAdminService(
    createSuperAdminUsecase,
    deleteSuperAdminUsecase,
    getSuperAdminByIdUsecase,
    updateSuperAdminUsecase,
    getAllSuperAdminsUsecase
);

// Create an Express router
export const superAdminRouter = Router();

// Route handling for creating a new admin
superAdminRouter.post(
  "/create",
  validateSuperAdminInputMiddleware,superAdminService.createSuperAdmin.bind(
    superAdminService
  )
);

// Route handling for getting an admin by ID
superAdminRouter.get(
  "/getById/:superAdminId",superAdminService.getSuperAdminById.bind(
    superAdminService
  )
);

// Route handling for updating an admin by ID
superAdminRouter.put("/update/:superAdminId",validateSuperAdminInputMiddleware, superAdminService.updateSuperAdmin.bind(superAdminService));

// Route handling for deleting an admin by ID
superAdminRouter.delete("/delete/:superAdminId",superAdminService.deleteSuperAdmin.bind(superAdminService));

// Route handling for getting all admins
superAdminRouter.get(
  "/getAll",
  superAdminService.getAllSuperAdmins.bind(
    superAdminService
  )
);
