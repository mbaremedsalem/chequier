import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChequeService } from '../services/cheque-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cheque-archive',
  templateUrl: './cheque-archive.component.html',
  styleUrls: ['./cheque-archive.component.css']
})
export class ChequeArchiveComponent {
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
    this.getChequesArchive();
  }

  getChequesArchive(): void {
    this.chequeService.getChequeArchiver().subscribe(data => {
      this.chequeList = data;
      // Mettre à jour l'ID pour chaque élément de la liste
     // this.chequeList = this.chequeList.map((cheque, index) => ({ ...cheque, id: index + 1 }));
      this.dataSource = new MatTableDataSource<any>(this.chequeList);
      this.currentPageUrl = data.next;
    });
  }

  getCheques(pageUrl: string = 'http://127.0.0.1:8000/users/get-archive/'): void {
    this.chequeService.getChequeArchiver(pageUrl).subscribe(data => {
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
      acc[page] = `http://127.0.0.1:8000/users/get-archive/?page=${page}`;
      return acc;
    }, {});
  }
  applyFilter() {
    // Apply the filter directly to the MatTableDataSource
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }
 
  toggleSelection(courses: any) {
    courses.isSelected = !courses.isSelected;
  }
}
