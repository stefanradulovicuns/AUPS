export class ProductionOrder {
    productionOrderId: string | null = null;
    startDate: Date | null = null;
    endDate: Date | null = null;
    quantity: number | null = null;
    note: string | null = null;
    currentTechnologicalProcedure: number | null = null;
    currentTechnologicalProcedureExecuted: boolean | null = null;
    currentState: number | null = null;
    employeeId: string | null = null;
    manager: string | null = null;
    managerEmail: string | null = null;
    objectOfLaborId: string | null = null;
    objectOfLaborName: string | null = null;
    totalCount: number | null = null;

    constructor(productionOrderId: string, startDate: Date, endDate: Date, quantity: number, note: string, currentTechnologicalProcedure: number,
        employeeId: string, manager: string, objectOfLaborId: string, objectOfLaborName: string) {
        this.productionOrderId = productionOrderId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.quantity = quantity;
        this.note = note;
        this.currentTechnologicalProcedure = currentTechnologicalProcedure;
        this.employeeId = employeeId;
        this.manager = manager;
        this.objectOfLaborId = objectOfLaborId;
        this.objectOfLaborName = objectOfLaborName;
    }
}