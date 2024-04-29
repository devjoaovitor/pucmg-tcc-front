import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenericModalComponent } from 'src/app/components/generic-modal/generic-modal.component';
import { BebidaService } from 'src/app/services/bebidas.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {
  bebidas: any[];
  mensagemDeSucesso: string | null = null;
  showConfirmModal = false;
  idParaExcluir: number | null = null;
  isLoading: boolean = false;

  constructor(private router: Router, private bebidaService: BebidaService, public dialog: MatDialog) {
    this.bebidas = [];
  }

  ngOnInit() {
    this.carregarBebidas();
  }

  administrador(): boolean {
    const permissao = localStorage.getItem('permissao');
    return permissao === 'Administrador';
  }

  editarBebida(id: number) {
    this.router.navigate(['/bebidas/edit', id]);
  }


  openDialog(id: number) {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      width: '387px',
      data: {
        message: 'Tem certeza que deseja excluir essa bebida? O processo não poderá ser desfeito.',
        confirmAction: () => this.excluirBebida(id)
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  carregarBebidas() {
    this.isLoading = true;

    this.bebidaService.getAllBebidas().subscribe(
      (bebidas) => {
        this.bebidas = bebidas;
      },
      (error) => {
        console.error('Erro ao obter a lista de bebidas:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  excluirBebida(id: number) {
    this.isLoading = true;

    this.bebidaService.deleteBebida(id).subscribe(
      () => {
        this.carregarBebidas();
        this.mensagemDeSucesso = 'Bebida excluída com sucesso!';
        setTimeout(() => {
          this.mensagemDeSucesso = null;
        }, 2000);
      },
      (error) => {
        console.error('Erro ao excluir a bebida:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  gerarRelatorio() {
    this.bebidaService.gerarRelatorioBebidas().subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => {
        console.error('Erro ao gerar relatório de bebidas:', error);
      }
    );
  }
}
