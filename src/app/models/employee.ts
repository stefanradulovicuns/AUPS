export class Employee {
    employeeId: string | null = null;
    firstName: string | null = null;
    lastName: string | null = null;
    email: string | null = null;
    password: string | null = null;
    jmbg: string | null = null;
    phoneNumber: string | null = null;
    address: string | null = null;
    city: string | null = null;
    sallary: number | null = null;
    dateOfEmployment: Date | null = null;
    workplaceId: string | null = null;
    organizationalUnitId: string | null = null;

    constructor(employeeId: string, firstName: string, lastName: string, email: string, password: string, jmbg: string,
        phoneNumber: string, address: string, city: string, sallary: number, dateOfEmployment: Date, workplaceId: string,
        organizationalUnitId: string) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.jmbg = jmbg;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.city = city;
        this.sallary = sallary;
        this.dateOfEmployment = dateOfEmployment;
        this.workplaceId = workplaceId;
        this.organizationalUnitId = organizationalUnitId;
    }
}