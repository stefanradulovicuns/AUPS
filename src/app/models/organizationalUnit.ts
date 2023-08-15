export class OrganizationalUnit {
    organizationalUnitId: string | null = null;
    organizationalUnitName: string | null = null;
    totalCount: number | null = null;

    constructor(organizationalUnitId: string, organizationalUnitName: string) {
        this.organizationalUnitId = organizationalUnitId;
        this.organizationalUnitName = organizationalUnitName;
    }
}