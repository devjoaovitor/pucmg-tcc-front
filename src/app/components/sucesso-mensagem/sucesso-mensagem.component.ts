import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sucesso-mensagem',
  templateUrl: './sucesso-mensagem.component.html',
  styleUrls: ['./sucesso-mensagem.component.scss']
})
export class SucessoMensagemComponent {
  @Input() mensagem: string = '';
}
