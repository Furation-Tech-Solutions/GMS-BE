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
import { validateAccessRuleInputMiddleware } from "@presentation/middlewares/avaibility/access-rule/access-rule-validation";



const mongooseConnection = mongoose.connection;

// Create an instance of the accessRuleDataSourceImpl and pass the mongoose connection
const accessRuleDataSource = new AccessRuleDataSourceImpl(mongooseConnection);
// Create an instance of the accessRuleRepositoryImpl and pass the accessRuleDataSourceImpl
const accessRuleRepository = new AccessRuleRepositoryImpl(accessRuleDataSource);

// Create instances of the required use cases and pass the accessRuleRepositoryImpl
const createaccessRuleUsecase = new CreateAccessRule(accessRuleRepository);
const updateaccessRuleUsecase = new UpdateAccessRule(accessRuleRepository);
const getaccessRuleByIdUsecase = new GetAccessRuleById(accessRuleRepository);
const deleteaccessRuleUsecase = new DeleteAccessRule(accessRuleRepository);
const getAllaccessRulesUsecase = new GetAllAccessRule(accessRuleRepository);

// Initialize accessRuleService and inject required dependencies 
const accessRuleService = new AccessRuleService(
    createaccessRuleUsecase,
    updateaccessRuleUsecase,
    getaccessRuleByIdUsecase,
    deleteaccessRuleUsecase,
    getAllaccessRulesUsecase
);

// Create an Express router
export const accessRuleRouter = Router();

// Route handling for creating a new accessRule
accessRuleRouter.post("/create", validateAccessRuleInputMiddleware,  accessRuleService.createAccessRule.bind(accessRuleService));
 
// Route handling for updating an accessRule by ID
accessRuleRouter.put("/update/:accessId",accessRuleService.updateAccessRule.bind(accessRuleService));

// Route handling for getting an accessRule by ID
accessRuleRouter.get("/getbyid/:accessId",accessRuleService.getAccessRuleById.bind(accessRuleService));

// Route handling for deleting an accessRule by ID
accessRuleRouter.delete("/delete/:accessId", accessRuleService.deleteAccessRule.bind(accessRuleService));

// Route handling for getting all accessRules
accessRuleRouter.get("/getAll", accessRuleService.getAllAccessRule.bind(accessRuleService));
