import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'https://tcc-back-one.vercel.app/eventos';

  constructor(private http: HttpClient) {}

  salvarEvento(evento: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post<any>(url, evento);
  }

  obterEventos(): Observable<any[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<any[]>(url);
  }

  obterEventoPorId(eventId: number): Observable<any> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.get<any>(url);
  }

  gerarRelatorio(): Observable<any> {
    const url = `https://tcc-back-one.vercel.app/relatorio-eventos`;
    return this.http.get<any>(url, { responseType: 'arraybuffer' as 'json' });
  }

  editarEvento(eventId: number, novoEvento: any): Observable<any> {
    const eventoParaEditar = { ...novoEvento };
    eventoParaEditar.dataevento = this.formatarData(eventoParaEditar.dataevento);

    const url = `${this.apiUrl}/${eventId}`;
    return this.http.put<any>(url, eventoParaEditar);
  }

  private formatarData(data: string): string {
    if (data) {
      const date = new Date(data);
      const dia = String(date.getDate()).padStart(2, '0');
      const mes = String(date.getMonth() + 1).padStart(2, '0');
      const ano = date.getFullYear();
      return `${ano}-${mes}-${dia}`;
    }
    return '';
  }
}
