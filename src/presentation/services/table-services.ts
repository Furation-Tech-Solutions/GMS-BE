// Import necessary classes, interfaces, and dependencies
import { NextFunction, Request, Response } from "express";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { CreateTableUsecase } from "@domain/table/usecases/create-table";
import {
  TableEntity,
  TableMapper,
  TableModel,
} from "@domain/table/entities/table";
import { GetTableByIdUsecase } from "@domain/table/usecases/get-table-by-id";
import { GetAllTablesUsecase } from "@domain/table/usecases/get-tables";
import { DeleteTableUsecase } from "@domain/table/usecases/delete-table";
import { UpdateTableUsecase } from "@domain/table/usecases/update-table";

export class TableService {
  private readonly createTableUsecase: CreateTableUsecase;
  private readonly getTableByIdUsecase: GetTableByIdUsecase;
  private readonly getAllTablesUsecase: GetAllTablesUsecase;
  private readonly updateTableUsecase: UpdateTableUsecase;
  private readonly deleteTableUsecase: DeleteTableUsecase;

  constructor(
    createTableUsecase: CreateTableUsecase,
    getTableByIdUsecase: GetTableByIdUsecase,
    getAllTablesUsecase: GetAllTablesUsecase,
    updateTableUsecase: UpdateTableUsecase,
    deleteTableUsecase: DeleteTableUsecase
  ) {
    this.createTableUsecase = createTableUsecase;
    this.getTableByIdUsecase = getTableByIdUsecase;
    this.getAllTablesUsecase = getAllTablesUsecase;
    this.updateTableUsecase = updateTableUsecase;
    this.deleteTableUsecase = deleteTableUsecase;
  }

  async createTable(req: Request, res: Response): Promise<void> {
    const tableData: TableModel = TableMapper.toModel(req.body);

    const newTable: Either<ErrorClass, TableEntity> =
      await this.createTableUsecase.execute(tableData);

    newTable.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: TableEntity) => {
        const resData = TableMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getTableById(req: Request, res: Response): Promise<void> {
    const tableId: string = req.params.tableId;
    const table: Either<ErrorClass, TableEntity> =
      await this.getTableByIdUsecase.execute(tableId);

    table.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      (result: TableEntity) => {
        const resData = TableMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

  async getAllTables(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllTablesUsecase to get all outlets
    const tables: Either<ErrorClass, TableEntity[]> =
      await this.getAllTablesUsecase.execute();
    tables.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (tables: TableEntity[]) => {
        const resData = tables.map((table) => TableMapper.toEntity(table));
        return res.json(resData);
      }
    );
  }

  async deleteTable(req: Request, res: Response): Promise<void> {
    const tableId: string = req.params.tableId;

    const deleteTable = await this.deleteTableUsecase.execute(tableId);

    deleteTable.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        const resData = "Deleted successfully";
        return res.json(resData);
      }
    );
  }

  async updateTable(req: Request, res: Response): Promise<void> {
    const tableId: string = req.params.tableId;
    const tableData: TableModel = req.body;
    // Get the existing outlet by ID
    const existingTable: Either<ErrorClass, TableEntity> =
      await this.getTableByIdUsecase.execute(tableId);

    existingTable.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: TableEntity) => {
        const resData = TableMapper.toEntity(result, true);
        const updatedTableEntity: TableEntity = TableMapper.toEntity(
          tableData,
          true,
          resData
        );

        // Call the UpdateTableUsecase to update the outlet
        const updatedTable: Either<ErrorClass, TableEntity> =
          await this.updateTableUsecase.execute(tableId, updatedTableEntity);

        updatedTable.cata(
          (error: ErrorClass) => {
            res.status(error.status).json({ error: error.message });
          },
          (response: TableEntity) => {
            // Convert updatedTable from TableEntity to plain JSON object using TableMapper
            const responseData = TableMapper.toModel(response);

            // Send the updated outlet as a JSON response
            res.json(responseData);
          }
        );
      }
    );
  }
}
