import { ChangeDetectorRef, Component } from '@angular/core';

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
    
  constructor(private cdr: ChangeDetectorRef) {}

  onSubmit() {

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
    // this.username = localStorage.getItem('username') || ''; 

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
