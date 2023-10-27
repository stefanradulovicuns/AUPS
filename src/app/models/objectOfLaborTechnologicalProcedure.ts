export class ObjectOfLaborTechnologicalProcedure {
    objectOfLaborTechnologicalProcedureId: string | null = null;
    orderOfExecution: number | null = null;
    objectOfLaborId: string | null = null;
    objectOfLaborName: string | null = null;
    technologicalProcedureId: string | null = null;
    technologicalProcedureName: string | null = null;
    technologicalProcedureDuration: number | null = null;
    technologicalSystemName: string | null = null;
    plantName: string | null = null;
    organizationalUnitName: string | null = null;
    totalCount: number | null = null;

    constructor(objectOfLaborTechnologicalProcedureId: string, orderOfExecution: number, objectOfLaborId: string, objectOfLaborName: string,
        technologicalProcedureId: string, technologicalProcedureName: string) {
        this.objectOfLaborTechnologicalProcedureId = objectOfLaborTechnologicalProcedureId;
        this.orderOfExecution = orderOfExecution;
        this.objectOfLaborId = objectOfLaborId;
        this.objectOfLaborName = objectOfLaborName;
        this.technologicalProcedureId = technologicalProcedureId;
        this.technologicalProcedureName = technologicalProcedureName;
    }
}