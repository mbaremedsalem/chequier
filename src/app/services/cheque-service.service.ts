import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { chequeModel } from '../models/cheque.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environement/environement';
const apiUrl = `${environment.cliUrl}cheque-envoyer/`;
const apiAllUrl = `${environment.cliUrl}all-cheque/`;
const apiUrldemande = `${environment.cliUrl}cheque-demander/`;
const apiUrlArchiv = `${environment.cliUrl}get-archive/`;
const apiUrlExcel = `${environment.cliUrl}cheque-envoyer-excel/${localStorage.getItem('code_agence') }/`;

const apiAllUrlExcel = `${environment.cliUrl}all-cheque-excel/`;
const API_BASE_URL = `${environment.cliUrl}send_email/`;
@Injectable({
  providedIn: 'root'
})
export class ChequeService {

  constructor(private http: HttpClient) { }

  getChequeexcel(): Observable<chequeModel[]> {
    const headers = new HttpHeaders().set('Authorization','JWT '+localStorage.getItem('access'));
    return this.http.get<any[]>(apiUrlExcel,{headers});
  }
  // all cheque excel
  getAllChequeexcel(): Observable<chequeModel[]> {
    const headers = new HttpHeaders().set('Authorization','JWT '+localStorage.getItem('access'));
    return this.http.get<any[]>(apiAllUrlExcel,{headers});
  }


  getCheque(pageUrl: string = apiUrl): Observable<any> {
    return this.http.get<any>(pageUrl);
  }

  //getAllCheque(): Observable<any> {
    //return this.http.get<any>(apiAllUrl);
  //}
  getAllCheque(pageUrl: string = apiAllUrl): Observable<any> {
    return this.http.get<any>(pageUrl);
  }
  getChequeDemander(pageUrl: string = apiUrldemande): Observable<any> {
    return this.http.get<any>(pageUrl);
  }

  getChequeArchiver(pageUrl: string = apiUrlArchiv): Observable<any> {
    return this.http.get<any>(pageUrl);
  }
  getNextPage(nextPageUrl: string): Observable<any> {
    return this.http.get<any>(nextPageUrl);
  }
  
  sendmail(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'JWT '+localStorage.getItem('access')
    });
    // Make a POST request to create the document
    return this.http.post(API_BASE_URL, formData, {
      headers: headers
    });
  }
  
}
