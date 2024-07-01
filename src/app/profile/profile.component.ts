import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  selectedFile: File | null = null;
  nom: string | null = null;
  email: string | null = null;
  phone: string | null = null;
  prenom: string | null = null;
  image: string | null = null;
  post: string |null = null;
  username!: string;
  agence!: string;
  profileForm!: FormGroup;
  loginInProgress = false;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private profileService: AuthServiceService) {
    this.profileForm = this.fb.group({
      nom: [localStorage.getItem('nom') || '', Validators.required],
      prenom: [localStorage.getItem('prenom') || '', Validators.required],
      phone: [localStorage.getItem('phone') || '', Validators.required],
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      post: [localStorage.getItem('post') || '', Validators.required],
      agence: [localStorage.getItem('code_agence') || '', Validators.required]
    });
  }

  onSubmit(): void {
    this.loginInProgress = true; 
    if (this.profileForm.valid) {
      this.profileService.updateProfile(this.profileForm.value).subscribe(
        response => {
          console.log('Profile updated successfully', response);
          // Update the form with the response data
          this.profileForm.patchValue(response);
          this.loginInProgress = false; 
        },
        error => {
          console.error('Error updating profile', error);
          this.loginInProgress = false; 
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngAfterViewInit(): void {
    // Votre code à l'intérieur de l'événement
    const nameInput = document.getElementById('nameInput') as HTMLInputElement;
    const emailInput = document.getElementById('emailInput') as HTMLInputElement;
    const passInput =  document.getElementById('passInput') as HTMLInputElement;

    this.nom = localStorage.getItem('nom') || '';
    this.prenom = localStorage.getItem('prenom') || '';
    this.username = localStorage.getItem('username') || '';
    this.phone = localStorage.getItem('phone') || '';
    this.image = localStorage.getItem('image') || '';
    this.post = localStorage.getItem('post') || '';
    this.email = localStorage.getItem('email') || '';
    this.agence = localStorage.getItem('code_agence') || ''; 

    if (nameInput) {
      nameInput.value = this.nom;
    }
    if (emailInput) {
      emailInput.value = localStorage.getItem('email') || '';
    }
    if (passInput) {
      passInput.value = localStorage.getItem('username') || '';
    }

    // Marquer la vue pour une vérification manuelle
    this.cdr.detectChanges();
  }


}
