import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BebidaService } from 'src/app/services/bebidas.service';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.scss']
})
export class BebidasComponent {
  public bebidaForm: FormGroup;
  mensagemDeSucesso: string | null = null;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private el: ElementRef, private bebidasService: BebidaService) {
    this.bebidaForm = this.fb.group({
      nomeBebida: ['', Validators.required],
      tipoBebida: ['', Validators.required],
      teorAlcoolico: [0, [Validators.required, Validators.max(100)]],
      descricao: [''],
      quantidadeBebida: ['', [Validators.required, Validators.min(0)]],
      valorUnitario: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get nomeBebida() { return this.bebidaForm.get('nomeBebida'); }
  get tipoBebida() { return this.bebidaForm.get('tipoBebida'); }
  get teorAlcoolico() { return this.bebidaForm.get('teorAlcoolico'); }
  get descricao() { return this.bebidaForm.get('descricao'); }
  get quantidadeBebida() { return this.bebidaForm.get('quantidadeBebida'); }
  get valorUnitario() { return this.bebidaForm.get('valorUnitario'); }


  ngOnInit() {}

  salvarBebida() {
    this.isLoading = true;
    const bebidaData = this.bebidaForm.value;
    this.bebidasService.salvarBebida(bebidaData).subscribe(
      (response) => {
        const mensagem = response?.message || 'Bebida salva com sucesso!';
        this.mensagemDeSucesso = mensagem;

        setTimeout(() => {
          this.mensagemDeSucesso = null;
        }, 3000);
      },
      (error) => {
        console.error('Erro ao salvar a bebida.', error);
      },
      () => {
        this.isLoading = false;
      }
    );
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

}
