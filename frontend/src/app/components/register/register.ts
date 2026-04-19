import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  serverErrors: string[] = [];
  successMessage = '';
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, this.usernameValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      dateOfBirth: ['', [Validators.required, this.ageValidator]]
    });
  }

  // Validar que o nome de utilizador só tem letras e dígitos
  usernameValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const valid = /^[a-zA-Z0-9]+$/.test(control.value);
    return valid ? null : { invalidUsername: true };
  }

  // Validar requisitos da palavra-passe
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const value = control.value;
    const errors: ValidationErrors = {};

    if (!/[A-Z]/.test(value)) errors['noUppercase'] = true;
    if (!/[a-z]/.test(value)) errors['noLowercase'] = true;
    if (!/[0-9]/.test(value)) errors['noDigit'] = true;

    return Object.keys(errors).length > 0 ? errors : null;
  }

  // Validar que o utilizador tem pelo menos 13 anos
  ageValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 13 ? null : { tooYoung: true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.serverErrors = [];
    this.successMessage = '';

    // Marcar todos os campos como touched para mostrar erros
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.markAsTouched();
    });

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = response.message;
        this.registerForm.reset();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        if (err.error?.errors) {
          this.serverErrors = err.error.errors;
        } else if (err.error?.message) {
          this.serverErrors = [err.error.message];
        } else {
          this.serverErrors = ['Erro ao criar conta. Tente novamente.'];
        }
        this.cdr.detectChanges();
      }
    });
  }

  // Helpers para o template
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get dateOfBirth() { return this.registerForm.get('dateOfBirth'); }
}
