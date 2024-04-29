import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenericModalComponent } from 'src/app/components/generic-modal/generic-modal.component';
import { EventoService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.scss']
})
export class ListaEventosComponent implements OnInit {
  eventos: any[] = [];
  isLoading: boolean = false;
  mensagemDeSucesso: string | null = null;
  constructor(private eventoService: EventoService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.carregarEventos();
  }

  carregarEventos() {
    this.isLoading = true;
    this.eventoService.obterEventos().subscribe(
      eventos => {
        this.eventos = eventos;
      },
      error => {
        console.error('Erro ao buscar os eventos:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  formatarData(data: string): string {
    const dataObj = new Date(data);
    const dia = ('0' + dataObj.getDate()).slice(-2);
    const mes = ('0' + (dataObj.getMonth() + 1)).slice(-2);
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  editarEvento(id: number) {
    this.router.navigate(['/evento/edit', id]);
  }

  gerarRelatorio() {
    this.isLoading = true;
    this.eventoService.gerarRelatorio().subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.error('Erro ao gerar relatório:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  administrador(): boolean {
    const permissao = localStorage.getItem('permissao');
    return permissao === 'Administrador';
  }

}
