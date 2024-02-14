import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup ;
  loading = false;
  returnUrl!: string ;
  submitted = false;
  loginInProgress = false;
  credentials = { username: '', password: '' };
  message: string | undefined;
  token: string | null | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,) {
  }
  ngOnInit(): void {
    this.initLoginForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  
 initLoginForm() {
   this.loginForm = this.fb.group({
     username: ['', Validators.compose([
       Validators.required,
       Validators.minLength(2),
       Validators.maxLength(50)
     ])
     ],
     password: ['', Validators.compose([
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(100)
     ])
     ]
   });
 }
 
 login() {
  this.loginInProgress = true; 
  this.auth.login(this.credentials).subscribe(
    (response: User) => {
      if (response.status === 200) {
        // Login success
        this.message = response.message;
        // Store the access token in local storage or a cookie
          localStorage.setItem('username', response.username);   
          localStorage.setItem('access', response.access);  
          localStorage.setItem('id', response.id.toString());   
          localStorage.setItem('access', response.access);
          localStorage.setItem('nom', response.firstname);
          localStorage.setItem('prenom', response.lastname);
          localStorage.setItem('email', response.email);
          localStorage.setItem('image', response.image);
          localStorage.setItem('post', response.post);
          this.token = localStorage.getItem('access');
          // Redirect to the home page
          this.router.navigate(['/acueil']);
        
      }
      else
      {
        this.message = response.message;
        this.showErrorMessage = true;
        if (this.message) {
          this.showErrorAlert(this.message);
        }
      }
    },
    () => {
      // Login error
      this.message = 'Informations invalides';
    }
  ).add(() => {
    this.loginInProgress = false; // Set to false after login completes (whether success or error)
  });
}

  submit() {
    this.login();
  }
  showErrorAlert(message: string) {
    this.errorMessage = message;
    this._snackBar.open(message, 'Fermer', {
      duration: 3000, // Durée d'affichage de l'alerte (3 secondes)
    });
  }
}
