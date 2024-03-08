import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Categoria } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiURL = "http://localhost:8080/v1/api/categorias";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  buscarPorNombre(nombreABuscar: string): Observable<any> {

    //https://angular.io/guide/http-configure-http-url-parameters
    const options =
      { params: new HttpParams().set('buscar-por-nombre', nombreABuscar)
                                .set('page', 0)
                                .set('size', 3)
                                .set('order', 'nombre,desc')
                                .set('order', 'ultimaActualizacion,desc')} ;

    return this.httpClient.get<any>(this.apiURL, options)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.post<Categoria>(this.apiURL, JSON.stringify(categoria), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(this.apiURL + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, categoria: Categoria): Observable<Categoria> {
    return this.httpClient.put<Categoria>(this.apiURL + id, JSON.stringify(categoria), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number){
    return this.httpClient.delete<Categoria>(this.apiURL + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }

}
