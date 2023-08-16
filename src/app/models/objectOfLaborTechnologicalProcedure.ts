export class ObjectOfLaborTechnologicalProcedure {
    objectOfLaborTechnologicalProcedureId: string | null = null;
    objectOfLaborId: string | null = null;
    technologicalProcedureId: string | null = null;
    totalCount: number | null = null;

    constructor(objectOfLaborTechnologicalProcedureId: string, objectOfLaborId: string, technologicalProcedureId: string) {
        this.objectOfLaborTechnologicalProcedureId = objectOfLaborTechnologicalProcedureId;
        this.objectOfLaborId = objectOfLaborId;
        this.technologicalProcedureId = technologicalProcedureId;
    }
}