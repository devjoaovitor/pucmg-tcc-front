import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { BebidasComponent } from './pages/bebidas/bebidas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { BebidasEditComponent } from './pages/bebidas/bebidas-edit/bebidas-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { CadastroUsuarioComponent } from './pages/usuarios/cadastro-usuario/cadastro-usuario.component';
import { VendasComponent } from './pages/vendas/vendas.component';
import { ListaEventosComponent } from './pages/eventos/lista-eventos/lista-eventos.component';
import { EventosEditComponent } from './pages/eventos/eventos-edit/eventos-edit.component';
import { MudarSenhaComponent } from './pages/usuarios/mudar-senha/mudar-senha.component';
import { ListaUsuariosComponent } from './pages/usuarios/lista-usuarios/lista-usuarios.component';
import { UsuarioEditComponent } from './pages/usuarios/usuario-edit/usuario-edit.component';
import { UsuarioService } from './services/usuario.service';
import { ListaVendasComponent } from './pages/vendas/lista-vendas/lista-vendas.component';
import { AdminGuard, VendedorGuard, VisualizacaoGuard } from './guards/auth-guard';
import { SucessoMensagemComponent } from './components/sucesso-mensagem/sucesso-mensagem.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    EventosComponent,
    BebidasComponent,
    EstoqueComponent,
    BebidasEditComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    VendasComponent,
    ListaEventosComponent,
    EventosEditComponent,
    MudarSenhaComponent,
    ListaUsuariosComponent,
    UsuarioEditComponent,
    ListaVendasComponent,
    SucessoMensagemComponent,
    LoadingComponent,
    GenericModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [UsuarioService, AdminGuard, VendedorGuard, VisualizacaoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
