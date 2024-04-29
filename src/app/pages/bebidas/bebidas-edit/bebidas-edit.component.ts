import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BebidaService } from 'src/app/services/bebidas.service';

@Component({
  selector: 'app-bebidas-edit',
  templateUrl: './bebidas-edit.component.html',
  styleUrls: ['./bebidas-edit.component.scss']
})
export class BebidasEditComponent implements OnInit {
  public bebidaForm: FormGroup;
  bebida: any;
  idBebida: number = 0;
  mensagemDeSucesso: string | null = null;
  isLoading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,  private router: Router, private bebidaService: BebidaService) {
    this.bebidaForm = this.fb.group({
      nomeBebida: ['', Validators.required],
      tipoBebida: ['', Validators.required],
      teorAlcoolico: ['', [Validators.required, Validators.max(100)]],
      descricao: ['', Validators.required],
      quantidadeBebida: ['', [Validators.required, Validators.min(0)]],
      valorUnitario: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
  this.getBebidas()
  }

  private patchFormValues(bebida: any) {
    this.bebidaForm.patchValue({
      nomeBebida: bebida.nomebebida,
      tipoBebida: bebida.tipobebida,
      teorAlcoolico: bebida.teoralcoolico,
      quantidadeBebida: bebida.quantidadebebida,
      descricao: bebida.descricao,
      valorUnitario: bebida.valorunitario,
    });
  }

  getBebidas(){
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.params['id'];
    this.bebidaService.getBebida(id).subscribe(
      (bebida) => {
        this.bebida = bebida;
        this.patchFormValues(bebida);
      },
      (error) => {
        console.error('Erro ao obter a bebida:', error);
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

  salvarBebida() {
  this.isLoading = true;
  const id = this.activatedRoute.snapshot.params['id'];
  const bebidaData = { ...this.bebidaForm.value, id };
  this.bebidaService.updateBebida({...bebidaData }).subscribe(
    () => {
      this.mensagemDeSucesso = 'Bebida atualizada com sucesso!';
      setTimeout(() => {
        this.mensagemDeSucesso = null;
        this.router.navigate(['/estoque']);
      }, 2000);
    },
    (error) => {
      console.error('Erro ao atualizar a bebida:', error);
    },
    () => {
      this.isLoading = false;
    }
  );
}

}
