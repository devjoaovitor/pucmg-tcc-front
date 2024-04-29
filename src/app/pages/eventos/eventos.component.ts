import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BebidaService } from 'src/app/services/bebidas.service';
import { EventoService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  public eventoForm: FormGroup;
  public bebidasDoEvento: any[] = [];
  public bebidasDisponiveis: any[] = [];
  public mensagemDeSucesso: string | null = null;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private bebidaService: BebidaService, private router: Router, private eventoService: EventoService) {
    this.eventoForm = this.fb.group({
      nomeEvento: ['', Validators.required],
      dataEvento: ['', Validators.required],
      localEvento: ['', Validators.required],
      bebidaSelecionada: ['', Validators.required],
      quantidadeBebida: ['', Validators.required]
    });

    this.bebidasDoEvento = [];
  }

  ngOnInit() {
    this.obterBebidasDisponiveis();
  }

  obterBebidasDisponiveis() {
    this.bebidaService.getAllBebidas().subscribe(
      (bebidas) => {
        this.bebidasDisponiveis = bebidas;
      },
      (error) => {
        console.error('Erro ao obter bebidas:', error);
      }
    );
  }

  limitarQuantidade(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const maxAttribute = inputElement.getAttribute('max');
    const maxQuantidade = maxAttribute ? parseFloat(maxAttribute) : 100;
    const valorAtual = parseFloat(inputElement.value);


    if (valorAtual > maxQuantidade) {
      inputElement.value = maxQuantidade.toString();
    }
  }

  limparQuantidadeBebida() {
    this.eventoForm.get('quantidadeBebida')?.setValue(0);
    const quantidadeBebidaControl = this.eventoForm.get('quantidadeBebida');
    if (quantidadeBebidaControl) {
      quantidadeBebidaControl.setValue(null);
    }
  }

  limitarValor(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = parseFloat(inputElement.value);

    if (currentValue < 0) {
      inputElement.value = '0';
    } else if (currentValue > 100) {
      inputElement.value = '100';
    }
  }


  adicionarBebida() {
    const bebidaSelecionada = this.eventoForm.get('bebidaSelecionada')?.value;
    const quantidadeBebida = this.eventoForm.get('quantidadeBebida')?.value;

    if (bebidaSelecionada && quantidadeBebida) {
      const bebidaDisponivel = this.bebidasDisponiveis.find(bebida => bebida.nomebebida === bebidaSelecionada);

      if (bebidaDisponivel && bebidaDisponivel.quantidadebebida >= quantidadeBebida) {
        bebidaDisponivel.quantidadebebida -= quantidadeBebida;

        const newQuantidadeBebida = bebidaDisponivel.quantidadebebida;
        this.eventoForm.get('quantidadeBebida')?.setValue(newQuantidadeBebida);

        if (bebidaDisponivel.quantidadebebida === 0) {
          this.bebidasDisponiveis = this.bebidasDisponiveis.filter(bebida => bebida.nomebebida !== bebidaSelecionada);
        }

        const bebida = { nome: bebidaSelecionada, quantidade: quantidadeBebida };
        this.bebidasDoEvento.push(bebida);
      }
    }
  }

  getQuantidadeMaxima(): number {
    const bebidaSelecionada = this.eventoForm.get('bebidaSelecionada')?.value;
    const bebidaDisponivel = this.bebidasDisponiveis.find(bebida => bebida.nomebebida === bebidaSelecionada);

    if (bebidaDisponivel) {
      return bebidaDisponivel.quantidadebebida;
    }

    return 0;
  }

  removerBebida(index: number) {
    const bebidaRemovida = this.bebidasDoEvento[index];
    const bebidaDisponivel = this.bebidasDisponiveis.find(bebida => bebida.nomebebida === bebidaRemovida.nome);
    if (bebidaDisponivel) {
      bebidaDisponivel.quantidadebebida += bebidaRemovida.quantidade;
    } else {
      this.bebidasDisponiveis.push({ nomebebida: bebidaRemovida.nome, quantidadebebida: bebidaRemovida.quantidade });
    }
    this.bebidasDoEvento.splice(index, 1);
  }

  exibirResumoEvento(): boolean {
    const nomeEvento = this.eventoForm.get('nomeEvento')?.value;
    const dataEvento = this.eventoForm.get('dataEvento')?.value;
    const localEvento = this.eventoForm.get('localEvento')?.value;
    const bebidasLength = this.bebidasDoEvento.length;

    return nomeEvento || dataEvento || localEvento || bebidasLength > 0;
  }

  formatarData(data: string): string {
    const datePipe: DatePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(data, 'dd/MM/yyyy');
    return formattedDate || '';
  }

  salvarEvento() {
    this.isLoading = true;
    const evento = {
      nomeEvento: this.eventoForm.value.nomeEvento,
      dataEvento: this.eventoForm.value.dataEvento,
      localEvento: this.eventoForm.value.localEvento,
      bebidas: this.bebidasDoEvento
    };

    this.eventoService.salvarEvento(evento).subscribe(
      response => {
        this.eventoForm.reset();
        this.bebidasDoEvento = [];
        this.obterBebidasDisponiveis();
        this.mensagemDeSucesso = 'Evento salvo com sucesso!';
        setTimeout(() => {
          this.mensagemDeSucesso = null;
        }, 2000);
      },
      error => {
        console.error('Erro ao salvar o evento:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
