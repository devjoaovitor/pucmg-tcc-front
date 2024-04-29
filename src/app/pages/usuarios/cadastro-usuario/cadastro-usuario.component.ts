import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent {
  cadastroForm: FormGroup;
  senhaGerada: string = '';
  mensagemDeSucesso: string | null = null;
  isLoading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: [''],
      permissao: ['', Validators.required]
    });

    this.gerarSenhaAleatoria();
  }

  get nome() { return this.cadastroForm.get('nome'); }
  get email() { return this.cadastroForm.get('email'); }
  get senha() { return this.cadastroForm.get('senha'); }
  get permissao() { return this.cadastroForm.get('permissao'); }

  gerarSenhaAleatoria() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let senha = '';
    for (let i = 0; i < 6; i++) {
      senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    this.senhaGerada = senha;
    this.cadastroForm.patchValue({ senha: senha });
  }

  cadastrarUsuario() {
    this.isLoading = true;

    const usuarioData = this.cadastroForm.value;
    this.usuarioService.cadastrarUsuario(usuarioData).subscribe(
      (response) => {
        this.mensagemDeSucesso = 'Usuário cadastrado com sucesso!';
        setTimeout(() => {
          this.mensagemDeSucesso = null;
          this.router.navigate(['/lista-usuarios']);
        }, 1000);
      },
      (error) => {
        console.error('Erro ao cadastrar usuário:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
