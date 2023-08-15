export class TechnologicalSystem {
    technologicalSystemId: string | null = null;
    technologicalSystemName: string | null = null;
    totalCount: number | null = null;

    constructor(technologicalSystemId: string, technologicalSystemName: string) {
        this.technologicalSystemId = technologicalSystemId;
        this.technologicalSystemName = technologicalSystemName;
    }
}