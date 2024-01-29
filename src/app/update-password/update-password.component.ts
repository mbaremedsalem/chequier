import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  loginForm!: FormGroup ;
  loading = false;
  returnUrl!: string ;
  submitted = false;
  loginInProgress = false;
  credentials = { phone: '', password: '' };
  message: string | undefined;
  token: string | null | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  changePasswordForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private _snackBar: MatSnackBar,
    private authService: AuthServiceService) {
  }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      phone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      this.loginInProgress = true;
      const formData = this.changePasswordForm.value;

      this.authService.changePassword(formData).subscribe(
        response => {
          // Handle success, e.g., show a success message
          console.log('Password changed successfully', response);
        },
        error => {
          // Handle error, e.g., show an error message
          console.error('Failed to change password', error);
        }
      ).add(() => {
        this.loginInProgress = false;
      });
    }
  }

  showErrorAlert(message: string) {
    this.errorMessage = message;
    this._snackBar.open(message, 'Fermer', {
      duration: 3000, // Durée d'affichage de l'alerte (3 secondes)
    });
  }
}
