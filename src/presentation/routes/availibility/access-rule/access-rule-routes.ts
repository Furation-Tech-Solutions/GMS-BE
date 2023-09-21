// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response

import { AccessRuleDataSourceImpl } from "@data/availibility/datasource/access-rule-datasource";
import { AccessRuleRepositoryImpl } from "@data/availibility/repositories/access-rule-repository-Imp";
import { CreateAccessRule } from "@domain/availibility/usecases/access-rule/create-usecase";
import { UpdateAccessRule } from "@domain/availibility/usecases/access-rule/update-usecase";
import { GetAccessRuleById } from "@domain/availibility/usecases/access-rule/get-access-rule-by-id-usecase";
import { DeleteAccessRule } from "@domain/availibility/usecases/access-rule/delete-usecase";
import { GetAllAccessRule } from "@domain/availibility/usecases/access-rule/getall-accessrule-usecase";
import { AccessRuleService } from "@presentation/services/availibility/access-rule/access-rule-services";



const mongooseConnection = mongoose.connection;

// Create an instance of the AdminDataSourceImpl and pass the mongoose connection
const accessRuleDataSource = new AccessRuleDataSourceImpl(mongooseConnection);
// Create an instance of the AdminRepositoryImpl and pass the AdminDataSourceImpl
const accessRuleRepository = new AccessRuleRepositoryImpl(accessRuleDataSource);

// Create instances of the required use cases and pass the AdminRepositoryImpl
const createShiftUsecase = new CreateAccessRule(accessRuleRepository);
const updateShiftUsecase = new UpdateAccessRule(accessRuleRepository);
const getShiftByIdUsecase = new GetAccessRuleById(accessRuleRepository);
const deleteShiftUsecase = new DeleteAccessRule(accessRuleRepository);
const getAllShiftsUsecase = new GetAllAccessRule(accessRuleRepository);

// Initialize AdminService and inject required dependencies 
const accessRuleService = new AccessRuleService(
    createShiftUsecase,
    updateShiftUsecase,
    getShiftByIdUsecase,
    deleteShiftUsecase,
    getAllShiftsUsecase
);

// Create an Express router
export const accessRuleRouter = Router();

// Route handling for creating a new admin
accessRuleRouter.post("/create",  accessRuleService.createAccessRule.bind(accessRuleService));

// Route handling for updating an shift by ID
accessRuleRouter.put("/update/:accessId",accessRuleService.updateAccessRule.bind(accessRuleService));

// Route handling for getting an shift by ID
accessRuleRouter.get("/getbyid/:accessId",accessRuleService.getAccessRuleById.bind(accessRuleService));

// Route handling for deleting an admin by ID
accessRuleRouter.delete("/delete/:accessId", accessRuleService.deleteAccessRule.bind(accessRuleService));

// Route handling for getting all shifts
accessRuleRouter.get("/getAll", accessRuleService.getAllAccessRule.bind(accessRuleService));
