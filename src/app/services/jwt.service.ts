import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JWTService {

  constructor(private http: HttpClient){}

  private apiUrl = 'http://172.20.10.2:8080/demo65/rs/auth/login'; 
  
  serverLogin(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }
  
  saveToken(token: string): void {
    localStorage.setItem('token', token);  
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');  
  }

  
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;  
  }

  
  deleteToken(): void {
    localStorage.removeItem('token');   
  }



}
