import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://tcc-back-one.vercel.app/usuarios';
  // private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro ocorrido; por favor, tente novamente mais tarde.');
  }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsuarioById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  cadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  editarUsuario(id: number, novoUsuario: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, novoUsuario)
      .pipe(
        catchError(this.handleError)
      );
  }

  excluirUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  alterarSenha(idUsuario: string, novaSenha: string): Observable<any> {
    const url = `${this.apiUrl}/alterar-senha/${idUsuario}`;
    const body = { novaSenha };
    return this.http.put(url, body);
}
}
