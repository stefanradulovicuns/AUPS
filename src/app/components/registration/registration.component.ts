import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  formGroup: FormGroup = this.fb.group({
    personName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    userType: ['', Validators.required]
  });
  isSubmitted: boolean = false;

  toastMessage: string | null = null;
  isError: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitForm() {
    this.isSubmitted = true;

    if (this.formGroup.valid) {
      const registartionRequest = Object.assign(this.formGroup.value);
      this.authService.register(registartionRequest).subscribe({
        next: (data) => {
          localStorage.setItem("accessToken", data.token ? data.token : '');
          this.router.navigate(['/employee']);
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
