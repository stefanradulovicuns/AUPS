export class TechnologicalProcedure {
    technologicalProcedureId: string | null = null;
    technologicalProcedureName: string | null = null;
    duration: number | null = null;
    organizationalUnitId: string | null = null;
    plantId: string | null = null;
    technologicalSystemId: string | null = null;
    totalCount: number | null = null;

    constructor(technologicalProcedureId: string, technologicalProcedureName: string, duration: number, organizationalUnitId: string,
        plantId: string, technologicalSystemId: string) {
        this.technologicalProcedureId = technologicalProcedureId;
        this.technologicalProcedureName = technologicalProcedureName;
        this.duration = duration;
        this.organizationalUnitId = organizationalUnitId;
        this.plantId = plantId;
        this.technologicalSystemId = technologicalSystemId;
    }
}