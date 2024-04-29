import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BebidasComponent } from './pages/bebidas/bebidas.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { BebidasEditComponent } from './pages/bebidas/bebidas-edit/bebidas-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/usuarios/cadastro-usuario/cadastro-usuario.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { ListaEventosComponent } from './pages/eventos/lista-eventos/lista-eventos.component';
import { EventosEditComponent } from './pages/eventos/eventos-edit/eventos-edit.component';
import { MudarSenhaComponent } from './pages/usuarios/mudar-senha/mudar-senha.component';
import { ListaUsuariosComponent } from './pages/usuarios/lista-usuarios/lista-usuarios.component';
import { UsuarioEditComponent } from './pages/usuarios/usuario-edit/usuario-edit.component';
import { ListaVendasComponent } from './pages/vendas/lista-vendas/lista-vendas.component';
import { AdminGuard, VendedorGuard, VisualizacaoGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },

  { path: 'eventos', component: EventosComponent, canActivate: [AdminGuard || VendedorGuard || VisualizacaoGuard]},
  { path: 'lista-eventos', component: ListaEventosComponent},
  { path: 'evento/edit/:id', component: EventosEditComponent, canActivate: [AdminGuard]  },

  { path: 'bebidas', component: BebidasComponent, canActivate: [AdminGuard || VendedorGuard] },
  { path: 'bebidas/edit/:id', component: BebidasEditComponent, canActivate: [AdminGuard]  },
  { path: 'estoque', component: EstoqueComponent },

  { path: 'vendas', component: VendasComponent, canActivate: [AdminGuard || VendedorGuard] },
  { path: 'lista-vendas', component: ListaVendasComponent },

  { path: 'cadastro-usuario', component: CadastroUsuarioComponent, canActivate: [AdminGuard || VendedorGuard] },
  { path: 'mudar-senha/:id', component: MudarSenhaComponent },
  { path: 'lista-usuarios' , component: ListaUsuariosComponent, canActivate: [AdminGuard || VendedorGuard || VisualizacaoGuard] },
  { path: 'usuario/edit/:id', component: UsuarioEditComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
