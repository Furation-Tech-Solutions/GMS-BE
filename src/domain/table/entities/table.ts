// Table Model
export class TableModel {
  constructor(
    public tableNo: string = "0",
    public partySizeMini: number = 0,
    public partySizeMax: number = 0,
    public tableCombinations: string[] | undefined = [],
    public reservedTimes: string[] | undefined = [],
    public seatingArea: string = "",
    public isBlocked: boolean = false,
    public outletId: string | { _id: string } | undefined,
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined
  ) {}
}

// Table Entity
export class TableEntity {
  constructor(
    public _id: string | undefined = undefined,
    public tableNo: string,
    public partySizeMini: number,
    public partySizeMax: number,
    public tableCombinations: string[] | undefined = [], // Optional field
    public reservedTimes: string[] | undefined = [], // Optional field
    public seatingArea: string, // Assuming seatingArea is an ObjectId string
    public isBlocked: boolean = false,
    public outletId: string | { _id: string },
    public updatedBy: string | { _id: string } | undefined = undefined,
    public createdBy: string | { _id: string } | undefined = undefined
  ) {}
}

// Table Mapper
export class TableMapper {
  static toEntity(
    tableData: any,
    includeId?: boolean,
    existingTable?: TableEntity
  ): TableEntity {
    if (existingTable != null) {
      return {
        ...existingTable,
        tableNo:
          tableData.tableNo !== undefined
            ? tableData.tableNo
            : existingTable.tableNo,
        partySizeMini:
          tableData.partySizeMini !== undefined
            ? tableData.partySizeMini
            : existingTable.partySizeMini,
        partySizeMax:
          tableData.partySizeMax !== undefined
            ? tableData.partySizeMax
            : existingTable.partySizeMax,
        tableCombinations:
          tableData.tableCombinations !== undefined
            ? tableData.tableCombinations
            : existingTable.tableCombinations,
        reservedTimes:
          tableData.reservedTimes !== undefined
            ? tableData.reservedTimes
            : existingTable.reservedTimes,
        seatingArea:
          tableData.seatingArea !== undefined
            ? tableData.seatingArea
            : existingTable.seatingArea,
        isBlocked:
          tableData.isBlocked !== undefined
            ? tableData.isBlocked
            : existingTable.isBlocked,
        outletId:
          tableData.outletId !== undefined
            ? { _id: tableData.outletId }
            : existingTable.outletId,
        updatedBy:
          tableData.updatedBy !== undefined
            ? { _id: tableData.updatedBy }
            : existingTable.updatedBy,
        createdBy:
          tableData.createdBy !== undefined
            ? { _id: tableData.createdBy }
            : existingTable.createdBy,
      };
    } else {
      const tableEntity: TableEntity = {
        _id: includeId
          ? tableData._id
            ? tableData._id.toString()
            : undefined
          : tableData._id.toString(),
        tableNo: tableData.tableNo,
        partySizeMini: tableData.partySizeMini,
        partySizeMax: tableData.partySizeMax,
        tableCombinations: tableData.tableCombinations,
        reservedTimes: tableData.reservedTimes,
        seatingArea: tableData.seatingArea, // Convert ObjectId to string
        isBlocked: tableData.isBlocked,
        outletId: { _id: tableData.outletId },
        updatedBy: { _id: tableData.updatedBy },
        createdBy: { _id: tableData.createdBy },
      };
      return tableEntity;
    }
  }

  static toModel(table: TableEntity): TableModel {
    return new TableModel(
      table.tableNo,
      table.partySizeMini,
      table.partySizeMax,
      table.tableCombinations,
      table.reservedTimes,
      table.seatingArea,
      table.isBlocked,
      table.outletId,
      table.updatedBy,
      table.createdBy
    );
  }
}
