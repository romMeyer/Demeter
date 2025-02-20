import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/AuthService';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[
    SharedModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,  
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginUsername() {
    return this.loginForm.get("username");
  }

  get loginPassword() {
    return this.loginForm.get("password");
  }

  get registerFirstName() {
    return this.registerForm.get("firstName");
  }

  get registerLastName() {
    return this.registerForm.get("lastName");
  }

  get registerUsername() {
    return this.registerForm.get("username");
  }

  get registerPassword() {
    return this.registerForm.get("password");
  }

  onSubmitLogin() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value);
    console.log('Form Submitted:', this.loginForm.value);
  }

  onSubmitRegister() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value);

    console.log('Form Submitted:', this.registerForm.value);
  }
}
