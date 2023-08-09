import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] | null = null;
  employee: Employee | null = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log(data);
        this.employees = data;
      },

      error: (error) => {
        console.log(error)
      },

      complete: () => { }
    });
  }

  createEmployee() {
    this.employee = new Employee('04e0ded8-f8dc-41c3-8a7b-823ab31b29cb', 'Jovan', 'Jovanovic', 'jovan@gmail.com',
      'testtest', '1234567890126', '1234567896', 'Futoska 12', 'Novi Sad', 150000, new Date(), 'b79f52eb-2fa0-4008-a6c5-da5855e72c1c',
      'fde43ec3-2aa3-4787-b010-c7ca616b0ec0');
    this.employeeService.createEmployee(this.employee).subscribe({
      next: (data) => {
        console.log(data);
        this.getEmployees();
      },

      error: (error) => {
        console.log(error)
      },

      complete: () => { }
    });
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.getEmployees();
      },

      error: (error) => {
        console.log(error)
      },

      complete: () => { }
    });
  }

}
