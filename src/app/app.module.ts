import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AcueilComponent } from './acueil/acueil.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileComponent } from './profile/profile.component';
import { ChequeEnvoyerComponent } from './cheque-envoyer/cheque-envoyer.component';
import { ChequeDistribuerComponent } from './cheque-distribuer/cheque-distribuer.component';
import { ChequeTraiterComponent } from './cheque-traiter/cheque-traiter.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { OpenexcelfileComponent } from './openexcelfile/openexcelfile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UpdatePasswordComponent,
    AcueilComponent,
    ProfileComponent,
    ChequeEnvoyerComponent,
    ChequeDistribuerComponent,
    ChequeTraiterComponent,
    OpenexcelfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
