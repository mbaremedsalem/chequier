import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AcueilComponent } from './acueil/acueil.component';
import { ProfileComponent } from './profile/profile.component';
import { ChequeEnvoyerComponent } from './cheque-envoyer/cheque-envoyer.component';
import { ChequeDistribuerComponent } from './cheque-distribuer/cheque-distribuer.component';
import { ChequeTraiterComponent } from './cheque-traiter/cheque-traiter.component';
import { ChequeArchiveComponent } from './cheque-archive/cheque-archive.component';
import { ChequeDemanderComponent } from './cheque-demander/cheque-demander.component';
import { TousChequeComponent } from './tous-cheque/tous-cheque.component';
import { ChequeBanqueComponent } from './cheque-banque/cheque-banque.component';
import { OpenexcelfileComponent } from './openexcelfile/openexcelfile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'change-password', component: UpdatePasswordComponent },

  
  {
    path: 'acueil', // Incluez "home" dans le chemin
    component: AcueilComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'cheque-banque', component: ChequeBanqueComponent },
      { path: 'tous-cheque', component: TousChequeComponent },
      { path: 'cheque-envoyer', component: ChequeEnvoyerComponent },
      { path: 'cheque-demander', component: ChequeDemanderComponent },
      { path: 'cheque-archive', component: ChequeArchiveComponent },
      { path: 'cheque-distribuer', component: ChequeDistribuerComponent },
      { path: 'cheque-traiter', component: ChequeTraiterComponent },
      { path: 'cheque-envoyer-excel', component: OpenexcelfileComponent },

      
      // { path: 'flux-entrant', component: FluxEntrantComponent },
      // { path: 'flux-sortant', component: FluxSortantComponent },
 
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
