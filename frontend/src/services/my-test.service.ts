import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Permite solicitudes desde cualquier origen
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Métodos permitidos
    'Access-Control-Allow-Headers': 'Content-Type, Authorization' // Encabezados permitidos
  })
};

@Injectable({
  providedIn: 'root'
})
export class MyTestService {

   private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    // Ejemplo de método GET
    getData(endpoint: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${endpoint}`, httpOptions);
    }

    // Ejemplo de método POST
    postData(endpoint: string, data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data);
    }

    // Ejemplo de método PUT
    putData(endpoint: string, data: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${endpoint}`, data);
    }

    // Ejemplo de método DELETE
    deleteData(endpoint: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${endpoint}`);
    }
}
