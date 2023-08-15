export class Plant {
    plantId: string | null = null;
    plantName: string | null = null;
    totalCount: number | null = null;

    constructor(plantId: string, plantName: string) {
        this.plantId = plantId;
        this.plantName = plantName;
    }
}