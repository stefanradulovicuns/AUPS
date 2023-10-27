import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizationalUnit } from 'src/app/models/organizationalUnit';
import { Workplace } from 'src/app/models/workplace';
import { AuthService } from 'src/app/services/auth.service';
import { OrganizationalUnitService } from 'src/app/services/organizational-unit.service';
import { WorkplaceService } from 'src/app/services/workplace.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  formGroup: FormGroup = this.fb.group({
    employeeId: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    jmbg: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    sallary: ['', Validators.required],
    dateOfEmployment: ['', Validators.required],
    organizationalUnitId: ['', Validators.required],
  });
  isSubmitted: boolean = false;

  organizationalUnits: OrganizationalUnit[] | null = null;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private organizationalUnitService: OrganizationalUnitService) { }

  ngOnInit(): void {
    this.getOrganizationalUnits();
  }

  getOrganizationalUnits() {
    this.organizationalUnitService.getOrganizationalUnits('', 'OrganizationalUnitName', 'ASC', 0, 0).subscribe({
      next: (data) => {
        this.organizationalUnits = data;
      },

      error: (error) => {
        console.log(error);
        this.toastMessage = 'Došlo je do greške';
        this.isError = true;
      },

      complete: () => { }
    });
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const employee = Object.assign(this.formGroup.value);
      const dateOfEmployment = new Date(
        this.formGroup.get('dateOfEmployment')?.value.year,
        this.formGroup.get('dateOfEmployment')?.value.month - 1,
        this.formGroup.get('dateOfEmployment')?.value.day + 1
      );
      employee.dateOfEmployment = dateOfEmployment;

      this.authService.registerFirstUser(employee).subscribe({
        next: (data) => {
          localStorage.setItem("accessToken", data.token ? data.token : '');
          this.router.navigate(['/radnici']);
        },

        error: (error) => {
          console.log(error);
          this.toastMessage = 'Došlo je do greške';
          this.isError = true;
        },

        complete: () => {

        }
      });
    }
  }

}
