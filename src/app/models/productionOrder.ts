export class ProductionOrder {
    productionOrderId: string | null = null;
    startDate: Date | null = null;
    endDate: Date | null = null;
    quantity: number | null = null;
    note: string | null = null;
    employeeId: string | null = null;
    objectOfLaborId: string | null = null;
    totalCount: number | null = null;

    constructor(productionOrderId: string, startDate: Date, endDate: Date, quantity: number, note: string,
        employeeId: string, objectOfLaborId: string) {
        this.productionOrderId = productionOrderId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.quantity = quantity;
        this.note = note;
        this.employeeId = employeeId;
        this.objectOfLaborId = objectOfLaborId;
    }
}