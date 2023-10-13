import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { TableModel } from "@domain/table/entities/table";
import { Table } from "../models/table-model";
import { SeatingArea } from "@data/seating-area/models/seating-area-model";

export interface TableDataSource {
  create(table: TableModel): Promise<any>;
  getById(id: string): Promise<any | null>;
  getAllTables(): Promise<any[]>;
  update(id: string, table: TableModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class TableDataSourceImpl implements TableDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(table: TableModel): Promise<any> {
    const existingTable = await Table.findOne({ tableNo: table.tableNo });

    if (existingTable) {
      throw ApiError.customError(409, "table already exist");
    }

    const existsSeatingArea = await SeatingArea.findOne({
      _id: table.seatingArea,
    });

    if (!existsSeatingArea) {
      throw ApiError.customError(404, "Seating Area Wrong Id");
    }

    const tableData = new Table(table);
    const createdTable = await tableData.save();

    // Push the created table's ID into the seating area's tables array
    existsSeatingArea.tables.push(createdTable._id);

    // Save the seating area document with the updated tables array
    await existsSeatingArea.save();

    return createdTable.toObject();
  }

  async getById(id: string): Promise<any | null> {
    const table = await Table.findById(id).populate({
      path: "seatingArea",
      select: "id abbreviation seatingAreaName",
    });
    return table ? table.toObject() : null;
  }

  async getAllTables(): Promise<any[]> {
    const tables = await Table.find().populate({
      path: "seatingArea",
      select: "id abbreviation seatingAreaName",
    });
    return tables.map((table) => table.toObject());
  }

  async update(id: string, table: TableModel): Promise<any> {
    const updatedTable = await Table.findByIdAndUpdate(id, table, {
      new: true,
    });
    return updatedTable ? updatedTable.toObject() : null;
  }

  async delete(id: string): Promise<void> {
    const existingTable = await Table.findOne({ _id: id });

    if (!existingTable) {
      throw ApiError.customError(409, "table not found");
    }

    const existsSeatingArea = await SeatingArea.findOne({
      _id: existingTable.seatingArea,
    });

    if (!existsSeatingArea) {
      throw ApiError.customError(404, "seating area not found");
    }

    const index = existsSeatingArea.tables.indexOf(existingTable._id);
    // Remove the created table's ID into the seating area's tables array
    existsSeatingArea.tables.splice(index, 1);
    // existsSeatingArea.tables.pull(existingTable._id);

    // Save the seating area document with the updated tables array
    await existsSeatingArea.save();

    await Table.findByIdAndDelete(id);
  }
}
