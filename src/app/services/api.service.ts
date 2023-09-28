import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders();
  private url = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/";

  constructor(
    private http: HttpClient
  ) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Access-Control-Allow-Origin', 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/');
    this.headers = this.headers.set('authorId', '273');
  }

  get<T>(ctrllerUri: string, query?: string): Observable<T> {
    let response: Observable<T>;
    if (query) {
      response = this.http.get<T>(this.url + ctrllerUri + '?' + query, {
        headers: this.headers,
      });
    } else {
      response = this.http.get<T>(this.url + ctrllerUri, {
        headers: this.headers,
      });
    }
    return response;
  }

  post<T>(ctrllerUri: string, data?: any): Observable<T> {
    const body = JSON.stringify(data);
    return this.http.post<T>(this.url + ctrllerUri, body, {
      headers: this.headers,
    });
  }

  patch<T>(ctrllerUri: string, data?: any): Observable<T> {
    const body = JSON.stringify(data);
    return this.http.patch<T>(this.url + ctrllerUri, body, {
      headers: this.headers,
    });
  }

  delete<T>(ctrllerUri: string, data?: any): Observable<T> {
    const body = JSON.stringify(data);
    return this.http.delete<T>(this.url + ctrllerUri, {
      headers: this.headers,
      body: body,
    });
  }
}