import { Component } from '@angular/core';
import { ChequeService } from '../services/cheque-service.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-openexcelfile',
  templateUrl: './openexcelfile.component.html',
  styleUrls: ['./openexcelfile.component.css']
})
export class OpenexcelfileComponent {
  eyeClosed: boolean = false;
  chequeData: any[] = [];
  iframeContent: SafeHtml | undefined;
  showSendButton: boolean = false;
  name: string = '';
  subj: string = '';
  selectedFile: File | null = null;
  message: string | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;
  generatedExcelFile: File | null = null;
  loginInProgress = false;
  
  constructor(private chequeService: ChequeService, private http: HttpClient,private _snackBar: MatSnackBar,private sanitizer: DomSanitizer) {}

  openExcell(): void {
    this.chequeService.getCheque().subscribe((data: any[]) => {
      this.exportToExcel(data);
      this.chequeData = data;
      this.generateIframeContent();
      this.generateExcelFile(data);
      
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
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Créer un objet File à partir du Blob et l'assigner à la variable selectedFile
    this.selectedFile = new File([blob], 'cheque_data.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

  private generateTableContent(data: any[]): string {
    let tableRows = '';
    data.forEach((row: any) => {
      let rowContent = '';
      Object.keys(row).forEach(key => {
        rowContent += `<td>${row[key]}</td>`;
      });
      tableRows += `<tr>${rowContent}</tr>`;
    });
    return `<table>${tableRows}</table>`;
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
  if (this.subj) {
      const formData = new FormData();
      // Ajoutez les autres champs à formData
      formData.append('name', localStorage.getItem('nom')!);
      formData.append('subj', this.subj);
      // Créer un fichier Excel à partir du Blob
      formData.append('file', this.selectedFile!);
      // Construire les en-têtes avec le jeton JWT
      const headers = new HttpHeaders({
          'Authorization': 'JWT ' + localStorage.getItem('access') // Remplacez yourJwtToken par le jeton JWT réel
      });
      this.loginInProgress = true; 
      this.http.post<any>('http://192.168.10.15/users/send_email/', formData, { headers: headers })
          .subscribe(
              (response) => {
                  console.log('Response:', response);
                  // Gérez la réponse ici
                  this.loginInProgress = false;
              },
              (error) => {
                  console.error('Error:', error);
                  // Gérez les erreurs ici
                  this.loginInProgress = false;
              }
          );
  }
}


}
