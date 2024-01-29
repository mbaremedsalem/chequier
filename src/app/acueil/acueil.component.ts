import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-acueil',
  templateUrl: './acueil.component.html',
  styleUrls: ['./acueil.component.css']
})
export class AcueilComponent {
  tiles: any;
  token: string | null | undefined;
  isHomePage: boolean = true; // Par défaut, la page est la page d'accueil
  searchTerm: string | undefined;
  searchResults: any[] | undefined; // Remplacez "any[]" par le type de données de vos résultats
  isSearching: boolean = false;
  documents: any[] = [];
  useTraditionalTable = false;
  showDocuments = false;
  showFluxs = false;


  constructor(private router: Router, private route: ActivatedRoute) {
    // Utilisez le routeur pour surveiller les modifications de l'URL
 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/home-admin';
      }
    });
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('access');
  }

  logout() {
    // Appel de la méthode de déconnexion du service d'authentification
    this.removeToken();
    // Redirigez l'utilisateur vers la page de connexion ou toute autre page appropriée après la déconnexion.
    // Vous pouvez utiliser le routeur Angular pour cela.
    this.router.navigate(['/login']);
  }
  reloadPage(targetRoute: string) {
    const currentRoute = this.router.url;
    // Vérifiez si la route actuelle est la même que la cible
    if (currentRoute === targetRoute) {
      // Si la route est la même, rechargez la page
      window.location.reload();
    }
}

toggleDocuments() {
  this.showDocuments = !this.showDocuments;
}
toggleFlux() {
  this.showFluxs = !this.showFluxs;
}
}
