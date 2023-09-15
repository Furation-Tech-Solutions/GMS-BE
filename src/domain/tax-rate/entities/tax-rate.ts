
export class TaxRateModel{
    constructor(
        public type: string = "",
        public percentage: number = 0,
    ){}
}

export class TaxRateEntity{
    constructor(
        public id: string | undefined = undefined,
        public type:string ,
        public percentage: number 
    ){}
}
export class TaxRateMapper{
     static toEntity(
        taxRate:any,
        includeId?:boolean,
        existingTaxRate?:TaxRateEntity|null
        ):TaxRateEntity{
            if(existingTaxRate != null){
                return {
                    ...existingTaxRate,
                    type:
                    taxRate.type!==undefined
                    ?taxRate.type:existingTaxRate.type,
                    percentage:
                    taxRate.percentage!==undefined
                    ?taxRate.percentage:existingTaxRate.percentage
                }
            }
            else {
                const taxRateEntity:TaxRateEntity ={
                    id:includeId
                    ?taxRate._id
                     ?taxRate._id.toString()
                     :undefined
                      :taxRate._id.toString(),
                    type:taxRate.type,
                    percentage:taxRate.percentage,
                }
                return taxRateEntity;
            }
        }

        static toModel(taxRate:TaxRateEntity):TaxRateModel{
            return{
                type:taxRate.type,
                percentage: taxRate.percentage,
            }
        }

}