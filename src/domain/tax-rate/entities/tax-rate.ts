export class TaxRateModel {
  constructor(
    public type: string = "",
    public percentage: number = 0,
    public updatedBy: string | undefined = undefined,
    public createdBy: string | undefined = undefined
  ) {}
}

export class TaxRateEntity {
  constructor(
    public _id: string | undefined = undefined,
    public type: string,
    public percentage: number,
    public updatedBy: string | undefined = undefined,
    public createdBy: string | undefined = undefined
  ) {}
}
export class TaxRateMapper {
  static toEntity(
    taxRate: any,
    includeId?: boolean,
    existingTaxRate?: TaxRateEntity | null
  ): TaxRateEntity {
    if (existingTaxRate != null) {
      return {
        ...existingTaxRate,
        type: taxRate.type !== undefined ? taxRate.type : existingTaxRate.type,
        percentage:
          taxRate.percentage !== undefined
            ? taxRate.percentage
            : existingTaxRate.percentage,
        createdBy:
          taxRate.createdBy !== undefined
            ? taxRate.createdBy
            : existingTaxRate.createdBy,
        updatedBy:
          taxRate.updatedBy !== undefined
            ? taxRate.updatedBy
            : existingTaxRate.updatedBy,
      };
    } else {
      const taxRateEntity: TaxRateEntity = {
        _id: includeId
          ? taxRate._id
            ? taxRate._id.toString()
            : undefined
          : taxRate._id.toString(),
        type: taxRate.type,
        percentage: taxRate.percentage,
        updatedBy: taxRate.updatedBy,
        createdBy: taxRate.createdBy,
      };
      return taxRateEntity;
    }
  }

  static toModel(taxRate: TaxRateEntity): TaxRateModel {
    return {
      type: taxRate.type,
      percentage: taxRate.percentage,
      updatedBy: taxRate.updatedBy,
      createdBy: taxRate.createdBy,
    };
  }
}
