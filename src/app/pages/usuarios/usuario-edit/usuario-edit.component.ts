import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {
  usuarioForm: FormGroup;
  usuario: any;
  idUsuario: number = 0;
  mensagemDeSucesso: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      permissao: ['', Validators.required]
    });
  }

  ngOnInit() {
    const idUsuario = this.route.snapshot.paramMap.get('id');
    this.getUsuarioById(Number(idUsuario));
  }

  getUsuarioById(id: number) {
    this.isLoading = true;

    this.usuarioService.getUsuarioById(id).subscribe(
      (usuario) => {
        this.usuario = usuario;
        this.usuarioForm.patchValue(usuario);
      },
      (error) => {
        console.error('Erro ao obter o usuário:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  salvarEdicao() {
    this.isLoading = true;

    const novoUsuario = { ...this.usuario, ...this.usuarioForm.value };
    this.usuarioService.editarUsuario(this.usuario.id, novoUsuario)
      .subscribe(
        () => {
          this.mensagemDeSucesso = 'Sucesso ao editar dados do usuário!';
          setTimeout(() => {
            this.mensagemDeSucesso = null;
            this.router.navigate(['/lista-usuarios']);
          }, 1000);
        },
        (error) => {
          console.error('Erro ao editar usuário:', error);
        },
        () => {
          this.isLoading = false;
        }
      );
  }
}
