import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenericModalComponent } from 'src/app/components/generic-modal/generic-modal.component';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent {
  usuarios: any[] = [];
  mensagemDeSucesso: string | null = null;
  isLoading: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.verificacaoPermissao();
    this.getUsuarios();
  }

  getUsuarios() {
    this.isLoading = true;

    this.usuarioService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Erro ao obter a lista de usuários:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  verificacaoPermissao(): boolean {
    const permissao = localStorage.getItem('permissao');
    return permissao === 'Administrador';
  }

  editarUsuario(id: number) {
    this.router.navigate(['/usuario/edit', id]);
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      width: '387px',
      data: {
        message: 'Tem certeza que deseja excluir esse usuário? O processo não poderá ser desfeito.',
        confirmAction: () => this.excluirUsuario(id)
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  excluirUsuario(id: number) {
    this.isLoading = true;

    this.usuarioService.excluirUsuario(id)
      .subscribe(
        () => {
          this.mensagemDeSucesso = 'Usuário excluído com sucesso!';
          setTimeout(() => {
            this.mensagemDeSucesso = null;
          }, 2000);
          this.getUsuarios();
        },
        (error) => {
          console.error('Erro ao excluir usuário:', error);
        },
        () => {
          this.isLoading = false;
        }
      );
  }
}
