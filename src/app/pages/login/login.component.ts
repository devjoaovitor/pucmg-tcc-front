import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get senha() { return this.loginForm.get('senha'); }

  login() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      this.isLoading = true;
      this.authService.login(email, senha).subscribe(
        (response) => {
          console.log('Usuário autenticado:', response);
          this.router.navigate(['/home']);
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao autenticar usuário:', error);
          this.isLoading = false;
        }
      );
    }
  }

  recuperarSenha() {
    this.router.navigate(['/recuperar-senha']);
  }
}
