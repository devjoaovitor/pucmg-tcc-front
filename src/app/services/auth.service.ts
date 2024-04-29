import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://tcc-back-one.vercel.app/api/auth';
  // private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(response => {
        localStorage.setItem('permissao', response.usuario.permissao);
        localStorage.setItem('idUsuario', response.usuario.id);
        this.router.navigate(['/home']);
      })
    );
  }
}
