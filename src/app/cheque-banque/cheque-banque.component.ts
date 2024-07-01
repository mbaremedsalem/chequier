import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChequeService } from '../services/cheque-service.service';
import { OpenexcelfileComponent } from '../openexcelfile/openexcelfile.component';

@Component({
  selector: 'app-cheque-banque',
  templateUrl: './cheque-banque.component.html',
  styleUrls: ['./cheque-banque.component.css']
})
export class ChequeBanqueComponent {
  chequeList: any[] = [];

  iframeSrc: string = '';
  currentPageUrl!: string;
  dataSource = new MatTableDataSource<any>();
  searchTerm: string = '';
  balanceList: any [] = [
    {
      isSelected:false
    }
  ];
  count!:number;
  currentPage: number = 1;
  pages: number[] = [];
  pageUrls: { [key: number]: string } = {};

  nextPageUrl!: string ;
  previousPageUrl!: string ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private chequeService: ChequeService,@Inject(LOCALE_ID) private locale: string,public dialog: MatDialog, private router: Router,private http: HttpClient) { }


  ngOnInit(): void {
    this.getCheques();
  }

  getCheques(pageUrl: string = 'http://127.0.0.1:8000/users/cheque-banque-envoyer/'): void {
    this.chequeService.getCheque(pageUrl).subscribe(data => {
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
      acc[page] = `http://127.0.0.1:8000/users/cheque-banque-envoyer/?page=${page}`;
      return acc;
    }, {});
  }
  
  
openExcell(): void {  
  const dialogRef = this.dialog.open(OpenexcelfileComponent, {
    width: '1100px',
    height:'690px',
    panelClass: 'custom-dialog-container',
    position: {
      left: '298px', // Ajoutez la valeur de padding-left que vous souhaitez
    },
    disableClose: true
  });

}

  applyFilter() {
    // Apply the filter directly to the MatTableDataSource
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
 
  toggleSelection(courses: any) {
    courses.isSelected = !courses.isSelected;
  }
}
