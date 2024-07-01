import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChequeService } from '../services/cheque-service.service';
import { OpenexcelfileComponent } from '../openexcelfile/openexcelfile.component';
import { OpenallchequeComponent } from '../openallcheque/openallcheque.component';
import * as XLSX from 'xlsx';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-tous-cheque',
  templateUrl: './tous-cheque.component.html',
  styleUrls: ['./tous-cheque.component.css']
})
export class TousChequeComponent {
  chequeList: any[] = [];

  iframeSrc: string = '';
  currentPageUrl!: string;
  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';
  balanceList: any [] = [
    {
      isSelected:false
    }
  ]
  count!:number;
  currentPage: number = 1;
  pages: number[] = [];
  pageUrls: { [key: number]: string } = {};
  iframeContent: SafeHtml | undefined;
  nextPageUrl!: string ;
  previousPageUrl!: string ;
  messages!: Message[] ;
  dataAvailable: boolean = false;
  chequeData: any[] = [];
  generatedExcelFile: File | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private chequeService: ChequeService,@Inject(LOCALE_ID) private locale: string,private sanitizer: DomSanitizer,public dialog: MatDialog, private router: Router,private http: HttpClient) { }


  ngOnInit(): void {
    this.getCheques();
  }

 // getCheques(): void {
   // this.chequeService.getAllCheque().subscribe(data => {
     // this.chequeList = data.results;
      //this.count = data.count;
      //console.log(this.count)
      // Mettre à jour l'ID pour chaque élément de la liste
      //this.chequeList = this.chequeList.map((cheque, index) => ({ ...cheque, id: index + 1 }));
      //this.dataSource = new MatTableDataSource<any>(this.chequeList);
      //this.currentPageUrl = data.next;
    //});
  //}
  
  getCheques(pageUrl: string = 'http://127.0.0.1:8000/users/all-cheque/'): void {
    this.chequeService.getAllCheque(pageUrl).subscribe(data => {
      this.chequeList = data.results;
      this.count = data.count;
      console.log(this.count);
      this.chequeList = this.chequeList.map((cheque, index) => ({ ...cheque, id: index + 1 }));
      this.dataSource = new MatTableDataSource<any>(this.chequeList);
      this.nextPageUrl = data.next;
      this.previousPageUrl = data.previous;

      this.setupPagination(pageUrl);
    });
  }

  fetchPage(pageUrl: string): void {
    this.getCheques(pageUrl);
  }

  extractPageNumber(url: string): number {
    const match = url.match(/page=(\d+)/);
    return match ? +match[1] : 1;
  }

  setupPagination(currentPageUrl: string): void {
    const totalPages = Math.ceil(this.count / 10);  // Assuming each page has 10 items
    this.currentPage = this.extractPageNumber(currentPageUrl);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.pageUrls = this.pages.reduce((acc: { [key: number]: string }, page: number) => {
      acc[page] = `http://127.0.0.1:8000/users/all-cheque/?page=${page}`;
      return acc;
    }, {});
  }

openExcell(): void {  
  this.chequeService.getChequeexcel().subscribe((data: any[]) => {
    if (data && data.length > 0) { 
      this.chequeData = data;
      this.dataAvailable = true;
      this.generateIframeContent();
      this.exportToExcel(data); // Call exportToExcel directly to download the file
    } else { 
      this.messages = [{ severity: 'warn', detail: 'Pas de chèques pour le moment', life: 30000 }];
    }
  });

}

private generateIframeContent(): void {
  const tableContent = this.generateTableContent(this.chequeData);
  const htmlContent = `<html><head><style>table, th, td { border: 1px solid black; border-collapse: collapse; }</style></head><body>${tableContent}</body></html>`;
  this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
}

private generateTableContent(data: any[]): string {
  let tableRows = '';
  data.forEach((row: any, index: number) => {
    let rowContent = `<td>${index + 1}</td>`;
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
            <th>N° Ligne</th>
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
exportToExcel(data: any[]): void {
  const dataWithLineNumbers = data.map((row, index) => ({
    'N° Ligne': index + 1,
    ...row
  }));
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataWithLineNumbers);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'cheque_data.xlsx';
  link.click();
  window.URL.revokeObjectURL(url);
}

  applyFilter() {
    // Apply the filter directly to the MatTableDataSource
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
 
  toggleSelection(courses: any) {
    courses.isSelected = !courses.isSelected;
  }
}
