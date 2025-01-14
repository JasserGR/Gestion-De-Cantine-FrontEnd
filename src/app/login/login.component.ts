import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  authService=inject(AuthService);

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('clicked button', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.loginError = false;
          localStorage.setItem('access_token', response.access_token);
          const decodedToken: any = jwtDecode(response.access_token);
          localStorage.setItem('role', decodedToken.role);
          return this.router.navigate(['/home']);
        },
        error: (error: any) => {
          this.loginError = true;
          console.log('Login error', error);
        },
        complete: () => {
          console.log('Login request completed');
        }
      });
    } else {
      this.loginError = true;
    }
  }
}
