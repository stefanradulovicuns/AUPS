export class Workplace {
    workplaceId: string | null = null;
    workplaceName: string | null = null;
    totalCount: number | null = null;

    constructor(workplaceId: string, workplaceName: string, totalCount: number) {
        this.workplaceId = workplaceId;
        this.workplaceName = workplaceName;
        this.totalCount = totalCount;
    }
}