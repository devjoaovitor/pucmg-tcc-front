import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router, public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(GenericModalComponent, {
      width: '387px',
      data: {
        message: 'Tem certeza que deseja sair?',
        confirmAction: () => this.confirm()
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  confirm() {
    localStorage.removeItem('permissao');
    this.router.navigate(['/login']);
   }

  isUserLoggedIn(): boolean {
    const permissao = localStorage.getItem('permissao');
    return permissao !== null;
  }

  administrador(): boolean {
    const permissao = localStorage.getItem('permissao');
    return permissao === 'Administrador';
  }

  visualizacao(): boolean {
    const permissao = localStorage.getItem('permissao');
    return permissao === 'Visualizacao';
  }

  vendedor(): boolean {
    const permissao = localStorage.getItem('permissao');
    return permissao === 'Vendedor';
  }

  mudarSenha() {
    const id = 1;
    this.router.navigate(['/mudar-senha/', id]);
  }

}
