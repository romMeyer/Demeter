import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.email]],
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
