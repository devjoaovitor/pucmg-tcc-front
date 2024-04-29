import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  isUserLoggedIn(): boolean {
    const permissao = localStorage.getItem('permissao');
    return permissao !== null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authGuard: AuthGuard) {}

  canActivate(): boolean {
    return this.authGuard.isUserLoggedIn() && this.checkPermissao('Administrador');
  }

  private checkPermissao(permissao: string): boolean {
    const permissaoAtual = localStorage.getItem('permissao');
    return permissaoAtual === permissao;
  }
}

@Injectable({
  providedIn: 'root'
})
export class VisualizacaoGuard implements CanActivate {
  constructor(private authGuard: AuthGuard) {}

  canActivate(): boolean {
    return this.authGuard.isUserLoggedIn() && this.checkPermissao('Visualizacao');
  }

  private checkPermissao(permissao: string): boolean {
    const permissaoAtual = localStorage.getItem('permissao');
    return permissaoAtual === permissao;
  }
}

@Injectable({
  providedIn: 'root'
})
export class VendedorGuard implements CanActivate {
  constructor(private authGuard: AuthGuard) {}

  canActivate(): boolean {
    return this.authGuard.isUserLoggedIn() && this.checkPermissao('Vendedor');
  }

  private checkPermissao(permissao: string): boolean {
    const permissaoAtual = localStorage.getItem('permissao');
    return permissaoAtual === permissao;
  }
}
