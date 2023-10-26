export class ObjectOfLabor {
    objectOfLaborId: string | null = null;
    objectOfLaborName: string | null = null;
    description: string | null = null;
    price: number | null = null;
    stockQuantity: number | null = null;
    warehouseId: string | null = null;
    warehouseFullAddress: string | null = null;
    totalCount: number | null = null;

    constructor(objectOfLaborId: string, objectOfLaborName: string, descripiton: string, price: number,
        stockQuantity: number, warehouseId: string) {
        this.objectOfLaborId = objectOfLaborId;
        this.objectOfLaborName = objectOfLaborName;
        this.description = descripiton;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.warehouseId = warehouseId;
    }
}