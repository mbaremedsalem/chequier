import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { chequeModel } from '../models/cheque.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environement/environement';
const apiUrl = `${environment.mybaseurl}cheque-envoyer/`;
const API_BASE_URL = `${environment.mybaseurl}send_email/`;
@Injectable({
  providedIn: 'root'
})
export class ChequeService {

  constructor(private http: HttpClient) { }

  getCheque(): Observable<chequeModel[]> {
    const headers = new HttpHeaders().set('Authorization','JWT '+localStorage.getItem('access'));
    return this.http.get<any[]>(apiUrl,{headers});

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
