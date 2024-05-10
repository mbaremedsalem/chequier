import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChequeService } from '../services/cheque-service.service';
import { OpenexcelfileComponent } from '../openexcelfile/openexcelfile.component';

@Component({
  selector: 'app-cheque-envoyer',
  templateUrl: './cheque-envoyer.component.html',
  styleUrls: ['./cheque-envoyer.component.css']
})
export class ChequeEnvoyerComponent {
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private chequeService: ChequeService,@Inject(LOCALE_ID) private locale: string,public dialog: MatDialog, private router: Router,private http: HttpClient) { }


  ngOnInit(): void {
    this.getCheques();
  }

  getCheques(): void {
    this.chequeService.getCheque().subscribe(data => {
      this.chequeList = data.results;
      // Mettre à jour l'ID pour chaque élément de la liste
      this.chequeList = this.chequeList.map((cheque, index) => ({ ...cheque, id: index + 1 }));
      this.dataSource = new MatTableDataSource<any>(this.chequeList);
      this.currentPageUrl = data.next;
    });
  }
  


  getNextPage(): void {
    if (this.currentPageUrl) {
      this.chequeService.getNextPage(this.currentPageUrl).subscribe(data => {
        this.chequeList = data.results;
        this.dataSource.data = this.chequeList;
        this.currentPageUrl = data.next;
      });
    }
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
