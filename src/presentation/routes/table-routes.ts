// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { TableDataSourceImpl } from "@data/table/datasources/table-data-source";
import { TableRepositoryImpl } from "@data/table/repositories/table-repository-impl";
import { CreateTable } from "@domain/table/usecases/create-table";
import { TableService } from "@presentation/services/table-services";
import { GetTableById } from "@domain/table/usecases/get-table-by-id";
import { GetAllTables } from "@domain/table/usecases/get-tables";
import { DeleteTable } from "@domain/table/usecases/delete-table";
import { UpdateTable } from "@domain/table/usecases/update-table";
import { validateTableInputMiddleware } from "@presentation/middlewares/table/table-validation";

const mongooseConnection = mongoose.connection;
// Create an instance of the TableDataSourceImpl and pass the mongoose connection
const tableDataSource = new TableDataSourceImpl(mongooseConnection);

// Create an instance of the TableRepositoryImpl and pass the RoomDataSourceImpl
const tableRepository = new TableRepositoryImpl(tableDataSource);

// Create instances of the required use cases and pass the TableRepositoryImpl
const createTableUsecase = new CreateTable(tableRepository);
const getTableByIdUsecase = new GetTableById(tableRepository);
const getTablesUsecase = new GetAllTables(tableRepository);
const updateTableUsecase = new UpdateTable(tableRepository);
const deleteTableUsecase = new DeleteTable(tableRepository);

// Initialize TableService and inject required dependencies
const tableService = new TableService(
  createTableUsecase,
  getTableByIdUsecase,
  getTablesUsecase,
  updateTableUsecase,
  deleteTableUsecase
);

// Create an Express router
export const tableRouter = Router();

// Route handling for creating a new Room
tableRouter.post(
  "/create",
  validateTableInputMiddleware(false),
  tableService.createTable.bind(tableService)
);

//Route handling for getTableById
tableRouter.get(
  "/getById/:tableId",
  tableService.getTableById.bind(tableService)
);

//Route hanndling for getTables
tableRouter.get("/getAllTables", tableService.getAllTables.bind(tableService));

tableRouter.put(
  "/updateTable/:tableId",
  validateTableInputMiddleware(true),
  tableService.updateTable.bind(tableService)
);

tableRouter.delete(
  "/deleteTable/:tableId",
  tableService.deleteTable.bind(tableService)
);
