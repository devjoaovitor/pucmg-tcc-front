import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

const senhaMatchValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
  const novaSenha = control.get('novaSenha')?.value;
  const confirmSenha = control.get('confirmSenha')?.value;

  if (novaSenha !== confirmSenha) {
    return { 'senhaMismatch': true };
  }

  return null;
};


@Component({
  selector: 'app-mudar-senha',
  templateUrl: './mudar-senha.component.html',
  styleUrls: ['./mudar-senha.component.scss']
})

export class MudarSenhaComponent {
  cadastroForm: FormGroup;
  mensagemDeSucesso: string | null = null;

  constructor(private fb: FormBuilder,  private usuarioService: UsuarioService) {
    this.cadastroForm = this.fb.group({
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmSenha: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: senhaMatchValidator });
  }

  mudarSenha() {
    if (this.cadastroForm.valid) {
      const novaSenha = this.cadastroForm.get('novaSenha')?.value;
      const confirmSenha = this.cadastroForm.get('confirmSenha')?.value;

      if (novaSenha === confirmSenha) {
      } else {
        console.log('As senhas não estão iguais.');
      }
    }
  }

  alterarSenha() {
    const idUsuario = localStorage.getItem('idUsuario');

    if (idUsuario !== null) {
      const novaSenha = this.cadastroForm.value.novaSenha;
      this.usuarioService.alterarSenha(idUsuario, novaSenha).subscribe(
        response => {
          this.mensagemDeSucesso = 'Senha alterada com sucesso!';
          setTimeout(() => {
            this.mensagemDeSucesso = null;
          }, 2000);
        },
        error => {
          console.error('Erro ao alterar a senha:', error);
        }
      );
    } else {
      console.error('ID do usuário não encontrado no localStorage.');
    }
}
}
