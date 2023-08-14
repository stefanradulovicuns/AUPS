import { Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @ViewChild('content') modal!: ElementRef;

  modalReference!: NgbModalRef;

  employees: Employee[] | null = null;
  employeesTotalCount: number | null = null;
  search: string = '';
  sortBy: string = 'FirstName';
  sortOrder: string = 'ASC';
  page: number = 1;
  count: number = 2;
  isLoading: boolean = false

  closeResult = ''

  formGroup: FormGroup = this.fb.group({
    employeeId: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
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
  isSubmitted: boolean = false;
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
    this.employeeService.getEmployees(this.search, this.sortBy, this.sortOrder, this.page, this.count).subscribe({
      next: (data) => {
        this.employees = data;
        this.employeesTotalCount = data && data[0] && data[0].totalCount ? data[0].totalCount : 0;
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

  createEmployee(employee: Employee) {
    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        this.getEmployees();
        this.modalReference?.close();
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
      next: () => {
        this.getEmployees();
        this.modalReference?.close();
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
        this.modalReference?.close();
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
    this.isSubmitted = false;
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalReference.result.then(
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

  onInputSearch() {
    this.page = 1;
    this.getEmployees();
  }

  onClickRow(employee: Employee) {
    const { totalCount, ...employeeData } = employee;
    this.formGroup.setValue({ ...employeeData });
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
    const { totalCount, ...employeeData } = employee;
    this.formGroup.setValue({ ...employeeData });
    this.formGroup.enable();
    this.operation = 'UPDATE';
    this.open(this.modal);
  }

  onClickDelete(event: Event, employee: Employee) {
    event.stopPropagation();
    const { totalCount, ...employeeData } = employee;
    this.formGroup.setValue({ ...employeeData });
    this.formGroup.disable();
    this.operation = 'DELETE';
    this.open(this.modal);
  }

  onSubmitForm() {
    this.isSubmitted = true;

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
