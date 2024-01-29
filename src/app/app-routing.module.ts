import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AcueilComponent } from './acueil/acueil.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'change-password', component: UpdatePasswordComponent },

  
  {
    path: 'acueil', // Incluez "home" dans le chemin
    component: AcueilComponent,
    children: [
      // { path: 'balance-general-annuel', component: BalanceGeneralAnnuelComponent },
      // { path: 'balance-general-mensuel', component: BalanceGeneralMensuelComponent },
      // { path: 'balance-detaille-annuel', component: BalanceDetailleAnnuelComponent },
      // { path: 'balance-detaille-manuel', component: BalanceDetailleMensuelComponent },
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
