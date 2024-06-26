import { Component } from '@angular/core';
import { ChequeService } from '../services/cheque-service.service';
import * as XLSX from 'xlsx';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from 'primeng/api';
import { isEmpty } from 'rxjs';


@Component({
  selector: 'app-openexcelfile',
  templateUrl: './openexcelfile.component.html',
  styleUrls: ['./openexcelfile.component.css']
})
export class OpenexcelfileComponent {
  eyeClosed: boolean = true;
  chequeData: any[] = [];
  iframeContent: SafeHtml | undefined;
  showSendButton: boolean = true;
  name: string = '';
  subj: string = '';
  selectedFile!: File ;
  message: string | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  generatedExcelFile: File | null = null;
  loginInProgress = false;
  messages!: Message[] ;
  dataAvailable: boolean = false;
  constructor(private chequeService: ChequeService, private http: HttpClient,private _snackBar: MatSnackBar,private sanitizer: DomSanitizer) {}



  ngOnInit(): void {
    const hasExecuted = localStorage.getItem('hasExecuted');

    if (!hasExecuted) {
      // Place your code here that you want to execute only once
      console.log('This will run only once on the first load.');
      window.location.reload();

      // Set the flag in localStorage to indicate that the code has executed
      localStorage.setItem('hasExecuted', 'true');
    }
  }


  openExcell(): void {

    this.chequeService.getChequeexcel().subscribe((data: any[]) => {

      if(data && data.length > 0) { 
        this.chequeData = data;
        this.dataAvailable = true;
        this.generateIframeContent();
        this.generateExcelFile(data);
      } else { 
        this.messages = [{ severity: 'warn', detail: 'Pas de chèques pour le moment',life: 30000 }];
      }


      
    });
  }

  exportToExcel(data: any[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Convertir le buffer en Blob
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Créer un objet URL pour le Blob
    const url = window.URL.createObjectURL(blob);

    // Créer un lien d'ancrage pour télécharger le fichier Excel
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cheque_data.xlsx'; // Nom du fichier à télécharger
    // link.click();

    // Nettoyer l'URL de l'objet Blob après le téléchargement
    window.URL.revokeObjectURL(url);
                
  }

  private generateIframeContent(): void {
    const tableContent = this.generateTableContent(this.chequeData);
    const htmlContent = `<html><head><style>table, th, td { border: 1px solid black; border-collapse: collapse; }</style></head><body>${tableContent}</body></html>`;
    this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
  }


generateExcelFile(data: any[]): void {
  // Ajouter les numéros de ligne
  const dataWithLineNumbers = data.map((row, index) => ({
    'n°Ligne': index + 1,
    ...row
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataWithLineNumbers);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Créer un objet File à partir du Blob et l'assigner à la variable selectedFile
  this.selectedFile = new File([blob], 'cheque_data.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}
private generateTableContent(data: any[]): string {
  let tableRows = '';
  data.forEach((row: any, index: number) => {
    let rowContent = `<td>${index + 1}</td>`; // Ajouter le numéro de ligne
    Object.keys(row).forEach(key => {
      rowContent += `<td>${row[key]}</td>`;
    });
    tableRows += `<tr>${rowContent}</tr>`;
  });
  return `
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>N° Ligne</th> <!-- Ajouter l'en-tête pour le numéro de ligne -->
            ${Object.keys(data[0]).map(key => `<th>${key}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  `;
}


  toggleEye(): void {
    this.eyeClosed = !this.eyeClosed;
    this.showSendButton = !this.showSendButton; 
    if (this.eyeClosed) {
      this.generateIframeContent();
    } else {
      this.iframeContent = undefined;
    }
  }
// Fonction pour convertir une chaîne de caractères en fichier Blob

onSubmit() {
  if (this.selectedFile && this.iframeContent) {
      const formData = new FormData();
      // Ajoutez les autres champs à formData
      formData.append('name', localStorage.getItem('nom')!);
      formData.append('subj', 'bonjour');
      // Créer un fichier Excel à partir du Blob
      formData.append('file', this.selectedFile!);
      // Construire les en-têtes avec le jeton JWT
      const headers = new HttpHeaders({
          'Authorization': 'JWT ' + localStorage.getItem('access') // Remplacez yourJwtToken par le jeton JWT réel
      });
      this.loginInProgress = true; 

      this.http.post<any>(`http://127.0.0.1:8000/users/send_email/${localStorage.getItem('code_agence')}/`, formData, { headers: headers })
          .subscribe(
              (response) => {
                  console.log('Response:', response);
                  // Gérez la réponse ici
                  this.loginInProgress = false;
                  this.messages = [
                    { severity: 'success', detail: response.message,life: 30000},
                  ];

                  // Effacer la partie qui contient le fichier Excel
                  // this.selectedFile = undefined;
                  this.iframeContent = undefined;
              },
              (error) => {
                this.message = error.message;
                this.showErrorMessage = true;
                
                 if (this.message) {
                  this.messages = [
                    { severity: 'error', detail: this.message },
                  ];
                 }
                  console.error('Error:', error);
                  // Gérez les erreurs ici
                  this.loginInProgress = false;
              }
          );
      } else {
        this.messages = [
          { severity: 'warn', detail: 'le fichier ont pas encore sélectionnés', life: 30000}
        ];
    }
}

}
