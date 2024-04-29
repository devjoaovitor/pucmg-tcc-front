import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos-edit',
  templateUrl: './eventos-edit.component.html',
  styleUrls: ['./eventos-edit.component.scss']
})
export class EventosEditComponent implements OnInit {
  evento: any = {};
  eventoForm!: FormGroup;
  mensagemDeSucesso: string | null = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private eventoService: EventoService
  ) {

   }

   ngOnInit(): void {
    this.eventoForm = this.fb.group({
      nome_evento: ['', [Validators.required]],
      data_evento: ['', [Validators.required]],
      local_evento: ['', [Validators.required]],
      bebidas: this.fb.array([])
    });

    this.route.paramMap.subscribe(params => {
      this.isLoading = true;
      const eventId = Number(params.get('id'));
      this.eventoService.obterEventoPorId(eventId).subscribe(
        response => {
          this.updateForm(response);
          console.log('Evento obtido com sucesso:', response);
        },
        error => {
          console.error('Erro ao obter o evento:', error);
        },
        () => {
          this.isLoading = false;
        }
      );
    });
  }

  updateForm(evento: any) {
    this.eventoForm.patchValue({
      nome_evento: evento.nome_evento,
      data_evento: evento.data_evento,
      local_evento: evento.local_evento,
    });
    this.setBebidas(evento.bebidas);
  }

  setBebidas(bebidas: any[]) {
    const bebidaFGs = bebidas.map(bebida => this.fb.group(bebida));
    const bebidaFormArray = this.fb.array(bebidaFGs);
    this.eventoForm.setControl('bebidas', bebidaFormArray);
  }

  formatarData(data: string): string {
    if (!data) {
      return '';
    }
    return new Date(data).toISOString().substring(0, 10);
  }

  adicionarBebida() {
    const bebidaGroup = this.fb.group({
      nome: ['', Validators.required],
      quantidade: ['', Validators.required]
    });
    this.bebidas.push(bebidaGroup);
  }

  removerBebida(index: number) {
    this.bebidas.removeAt(index);
  }

  get bebidas(): FormArray {
    return this.eventoForm.get('bebidas') as FormArray;
  }

  salvarEvento() {
    this.isLoading = true;
    this.route.paramMap.subscribe(params => {
      const eventId = Number(params.get('id'));
    this.eventoService.editarEvento(eventId, this.eventoForm.value).subscribe(
      response => {
        this.mensagemDeSucesso = 'Evento editado com sucesso!';
        setTimeout(() => {
          this.mensagemDeSucesso = null;
        }, 2000);
        console.log('Evento editado com sucesso:', response);
      },
      error => {
        console.error('Erro ao editar o evento:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  });
}
}
