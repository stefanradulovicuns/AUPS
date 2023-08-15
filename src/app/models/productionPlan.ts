export class ProductionPlan {
    productionPlanId: string | null = null;
    productionPlanName: string | null = null;
    description: string | null = null;
    objectOfLaborId: string | null = null;
    totalCount: number | null = null;

    constructor(productionPlanId: string, productionPlanName: string, description: string, objectOfLaborId: string) {
        this.productionPlanId = productionPlanId;
        this.productionPlanName = productionPlanName;
        this.description = description;
        this.objectOfLaborId = objectOfLaborId;
    }
}