import { Component } from '@angular/core';
import { ChequeService } from '../services/cheque-service.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
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

  constructor(private chequeService: ChequeService, private sanitizer: DomSanitizer) {}

  openExcell(): void {
    this.chequeService.getCheque().subscribe((data: any[]) => {
      this.exportToExcel(data);
      this.chequeData = data;
      this.generateIframeContent();
      
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
    link.click();

    // Nettoyer l'URL de l'objet Blob après le téléchargement
    window.URL.revokeObjectURL(url);
  }
  private generateIframeContent(): void {
    const tableContent = this.generateTableContent(this.chequeData);
    const htmlContent = `<html><head><style>table, th, td { border: 1px solid black; border-collapse: collapse; }</style></head><body>${tableContent}</body></html>`;
    this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
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
}
