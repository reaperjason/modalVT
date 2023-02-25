import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseURL = "http://20.84.54.175/IviBackendDemo/R32"

  constructor(private http: HttpClient) { }

  getStudents() {
    console.log(`${this.baseURL}/EstudiantesNee/1259`);
    return this.http.get(`${this.baseURL}/EstudiantesNee/1259`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.log('error', error);
    return throwError(error);
  }
}
