import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserProfile } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfileComponent implements OnInit {
  editForm!: FormGroup;
  profile: UserProfile | null = null;
  isLoadingProfile = true;
  isSubmitting = false;
  serverErrors: string[] = [];
  successMessage = '';
  showCurrentPassword = false;
  showNewPassword = false;
  loadError = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoadingProfile = true;
    this.loadError = '';

    this.authService.getProfile().subscribe({
      next: (response) => {
        this.profile = response.user;
        this.initForm();
        this.isLoadingProfile = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoadingProfile = false;
        if (err.status === 401) {
          this.authService.clearSession();
          this.router.navigate(['/login']);
        } else {
          this.loadError = 'Não foi possível carregar o perfil.';
        }
        this.cdr.detectChanges();
      }
    });
  }

  initForm(): void {
    if (!this.profile) return;

    // Converter dateOfBirth ISO para formato YYYY-MM-DD para o input date
    const dob = this.profile.dateOfBirth
      ? new Date(this.profile.dateOfBirth).toISOString().split('T')[0]
      : '';

    this.editForm = this.fb.group({
      username: [this.profile.username, [Validators.required, this.usernameValidator]],
      email: [this.profile.email, [Validators.required, Validators.email]],
      newPassword: ['', [this.optionalPasswordValidator]],
      dateOfBirth: [dob, [Validators.required, this.ageValidator]],
      currentPassword: ['', [Validators.required]]
    });
  }

  // Validar que o nome de utilizador só tem letras e dígitos
  usernameValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const valid = /^[a-zA-Z0-9]+$/.test(control.value);
    return valid ? null : { invalidUsername: true };
  }

  // Validar requisitos da nova palavra-passe (opcional - só valida se preenchido)
  optionalPasswordValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value || control.value === '') return null;

    const value = control.value;
    const errors: ValidationErrors = {};

    if (value.length < 8) errors['minlength'] = true;
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

  toggleCurrentPasswordVisibility(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  hasChanges(): boolean {
    if (!this.editForm || !this.profile) return false;
    const v = this.editForm.value;
    const dob = this.profile.dateOfBirth
      ? new Date(this.profile.dateOfBirth).toISOString().split('T')[0]
      : '';

    return v.username !== this.profile.username
      || v.email !== this.profile.email
      || v.dateOfBirth !== dob
      || (v.newPassword && v.newPassword !== '');
  }

  onSubmit(): void {
    this.serverErrors = [];
    this.successMessage = '';

    // Marcar todos os campos como touched
    Object.keys(this.editForm.controls).forEach(key => {
      this.editForm.get(key)?.markAsTouched();
    });

    if (this.editForm.invalid) return;

    if (!this.hasChanges()) {
      this.serverErrors = ['Não foram detetadas alterações ao perfil.'];
      return;
    }

    this.isSubmitting = true;

    const formValue = this.editForm.value;
    const data: any = {
      currentPassword: formValue.currentPassword
    };

    // Só enviar campos que mudaram
    if (formValue.username !== this.profile!.username) {
      data.username = formValue.username;
    }
    if (formValue.email !== this.profile!.email) {
      data.email = formValue.email;
    }
    const dob = this.profile!.dateOfBirth
      ? new Date(this.profile!.dateOfBirth).toISOString().split('T')[0]
      : '';
    if (formValue.dateOfBirth !== dob) {
      data.dateOfBirth = formValue.dateOfBirth;
    }
    if (formValue.newPassword && formValue.newPassword !== '') {
      data.newPassword = formValue.newPassword;
    }

    this.authService.updateProfile(data).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = response.message;

        // Atualizar dados da sessão local
        if (response.user) {
          this.authService.updateSessionUser(response.user.username, response.user.email);
          // Atualizar o profile local
          this.profile = {
            ...this.profile!,
            username: response.user.username,
            email: response.user.email,
            dateOfBirth: response.user.dateOfBirth
          };
          this.initForm();
        }

        // Limpar o campo da password
        this.editForm.get('currentPassword')?.reset('');
        this.editForm.get('newPassword')?.reset('');
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.error?.errors) {
          this.serverErrors = err.error.errors;
        } else if (err.error?.message) {
          this.serverErrors = [err.error.message];
        } else {
          this.serverErrors = ['Erro ao atualizar o perfil. Tente novamente.'];
        }
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  // Helpers para o template
  get username() { return this.editForm?.get('username'); }
  get email() { return this.editForm?.get('email'); }
  get newPassword() { return this.editForm?.get('newPassword'); }
  get dateOfBirth() { return this.editForm?.get('dateOfBirth'); }
  get currentPassword() { return this.editForm?.get('currentPassword'); }
}
