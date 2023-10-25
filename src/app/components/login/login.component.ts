import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
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
      const loginRequest = Object.assign(this.formGroup.value);
      this.authService.login(loginRequest).subscribe({
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
