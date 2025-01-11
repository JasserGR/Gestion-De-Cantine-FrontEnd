import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('clicked button', this.loginForm.value);
      // this.auth.login(this.loginForm.value).subscribe(
      //   (response: any) => {
      //     this.loginError = false;
      //     return this.router.navigate(['/home']);
      //   },
      //   (error: any) => {
      //     this.loginError = true;
      //     console.log('Login error', error);
      //   }
      // );
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
    }
  }
}
