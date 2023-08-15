export class Warehouse {
    warehouseId: string | null = null;
    address: string | null = null;
    city: string | null = null;
    capacity: number | null = null;
    totalCount: number | null = null;

    constructor(warehouseId: string, address: string, city: string, capacity: number) {
        this.warehouseId = warehouseId;
        this.address = address;
        this.city = city;
        this.capacity = capacity;
    }
}