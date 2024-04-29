import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BebidaService } from 'src/app/services/bebidas.service';
import { EventoService } from 'src/app/services/eventos.service';
import { VendasService } from 'src/app/services/vendas.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {
  vendasForm: FormGroup;
  eventosDisponiveis: any[] = [];
  bebidasDisponiveis: any[] = [];
  quantidadeMaxima: number = 0;
  mensagemDeSucesso: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private vendasService: VendasService,
    private eventoService: EventoService,
    private bebidaService: BebidaService
  ) {
    this.vendasForm = this.fb.group({
      evento: ['', Validators.required],
      bebida: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.max(this.quantidadeMaxima), Validators.min(1)]],
      formaPagamento: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.obterEventos();
    this.vendasForm.get('evento')?.valueChanges.subscribe(value => {
      this.onEventoChange(value);
    });
  }

  obterEventos() {
    this.isLoading = true;
    this.eventoService.obterEventos().subscribe(
      (eventos) => {
        this.eventosDisponiveis = eventos;
      },
      (error) => {
        console.error('Erro ao obter eventos:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onEventoChange(eventoId: any) {
    const eventoSelecionado = this.eventosDisponiveis.find(evento => evento.id === eventoId);
    this.bebidasDisponiveis = eventoSelecionado ? eventoSelecionado.bebidas : [];
    this.quantidadeMaxima = eventoSelecionado && this.bebidasDisponiveis.length > 0 ? this.bebidasDisponiveis[0].quantidade : 0;
    this.vendasForm.get('quantidade')?.setValidators([Validators.required, Validators.max(this.quantidadeMaxima)]);
    this.vendasForm.get('quantidade')?.updateValueAndValidity();
  }

  registrarVenda() {
    this.isLoading = true;
    const vendaData = {
      evento: this.vendasForm.get('evento')?.value,
      bebida: this.vendasForm.get('bebida')?.value,
      quantidade: this.vendasForm.get('quantidade')?.value,
      formaPagamento: this.vendasForm.get('formaPagamento')?.value,
      valorVenda: 10,
      nome_bebida: this.vendasForm.get('bebida')?.value,
    };
    this.vendasService.registrarVenda(vendaData).subscribe(
      (response) => {
        this.obterEventos();
        const mensagem = response?.message || 'Venda registrada com sucesso!';
        this.mensagemDeSucesso = mensagem;
        this.vendasForm.reset();
        this.vendasForm.get('evento')?.setValue('');
        setTimeout(() => {
          this.mensagemDeSucesso = null;
        }, 2000);
      },
      (error) => {
        console.error('Erro ao registrar a venda.', error);
      },
      () => {
        this.isLoading = false;
      }
    );
}
}
