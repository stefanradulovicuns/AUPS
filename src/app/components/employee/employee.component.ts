import { Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @ViewChild('content') modal!: ElementRef;

  employees: Employee[] | null = null;
  employeesTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'FirstName';
  sortOrder: string = 'ASC';
  page: number = 0;
  count: number = 2;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    employeeId: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    jmbg: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    sallary: [0, Validators.required],
    dateOfEmployment: ['', Validators.required],
    workplaceId: ['', Validators.required],
    organizationalUnitId: ['', Validators.required],
  });
  isSubmited: boolean = false;
  operation: string | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private employeeService: EmployeeService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.isLoading = true;
    this.getEmployeesTotalCount();
    this.employeeService.getEmployees(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        console.log(data);
        this.employees = data;
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getEmployeesTotalCount() {
    this.employeeService.getEmployeesTotalCount().subscribe({
      next: (data) => {
        this.employeesTotalCount = data;
      },

      error: (error) => {
        console.log(error)
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  createEmployee(employee: Employee) {
    // this.employee = new Employee('04e0ded8-f8dc-41c3-8a7b-823ab31b29cb', 'Jovan', 'Jovanovic', 'jovan@gmail.com',
    //   'testtest', '1234567890126', '1234567896', 'Futoska 12', 'Novi Sad', 150000, new Date(), 'b79f52eb-2fa0-4008-a6c5-da5855e72c1c',
    //   'fde43ec3-2aa3-4787-b010-c7ca616b0ec0');

    this.employeeService.createEmployee(employee).subscribe({
      next: (data) => {
        console.log(data);
        this.getEmployees();
        this.toastMessage = 'Uspešno dodat novi radnik';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe({
      next: (data) => {
        console.log(data);
        this.getEmployees();
        this.toastMessage = 'Uspešno izmenjeni podaci';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.getEmployees();
        this.toastMessage = 'Radnik je uspešno obrisan';
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  open(content: any) {
    this.isSubmited = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onClickRow(employee: Employee) {
    this.formGroup.setValue({ ...employee });
    this.formGroup.disable();
    this.operation = 'REVIEW';
    this.open(this.modal);
  }

  onClickAdd() {
    this.formGroup.reset();
    this.formGroup.enable();
    this.operation = 'CREATE';
    this.open(this.modal);
  }

  onClickUpdate(event: Event, employee: Employee) {
    event.stopPropagation();
    this.formGroup.setValue({ ...employee });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, id: string) {
    event.stopPropagation();
    this.deleteEmployee(id);
  }

  onSubmitForm() {
    console.log(this.formGroup.value);
    this.isSubmited = true;

    if (this.formGroup.valid) {
      const employee = Object.assign(this.formGroup.value);
      if (this.operation === 'CREATE') {
        this.createEmployee(employee);
      } else if (this.operation === 'UPDATE') {
        this.updateEmployee(employee);
      }
    }
  }

  onHideToast() {
    this.toastMessage = null;
    this.isError = false;
  }
}
