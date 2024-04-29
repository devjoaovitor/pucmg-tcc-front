import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  private apiUrl = 'https://tcc-back-one.vercel.app/vendas';

  constructor(private http: HttpClient) { }

  getVendas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  registrarVenda(vendaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, vendaData);
  }

  gerarRelatorioVendas(): Observable<any> {
    const url = `https://tcc-back-one.vercel.app/relatorio-vendas`;
    return this.http.get(url, { responseType: 'arraybuffer' as 'json' });
  }

}
