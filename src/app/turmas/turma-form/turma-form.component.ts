import { Component, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThfModalAction, ThfModalComponent, ThfStepperItem, ThfStepperStatus, ThfRadioGroupOption, ThfCheckboxGroupOption, ThfSelectOption } from '@totvs/thf-ui';
import { Turma } from '../turma.model';
import { Aluno, FormaIngresso } from 'src/app/alunos/aluno.model';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})
export class TurmaFormComponent {

  labelWidget: string;
  @ViewChild('sucessData') sucessData: ThfModalComponent;

  private alunosSub: Subscription;

  turmaForm: FormGroup;
  alunoForm: FormGroup;
  disciplina: FormGroup;
  // alunos: Array<ThfSelectOption> = [];
  step: number;

  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;

  constructor(private formBuilder: FormBuilder, public httpClient: HttpClient) {
    this.createTurmaForm(new Turma());
    this.createAlunoForm();
    this.changeStep(1);

    //  this.alunosSub = this.httpClient.get(API_URL+"/alunos/list")
    //  .subscribe((response: { hasNext: boolean, items: Array<any>}) => {
    //    this.alunos = response.items;
    //  });
  }

  createTurmaForm(turma: Turma) {
    this.turmaForm = this.formBuilder.group({
      descricao: ['',   Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300)
      ]) ],
      anoLetivo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)
      ]) ],
      periodoLetivo: ['', Validators.compose([
        Validators.required
      ]) ],
      numeroVagas: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  createAlunoForm() { 
    console.log("Create Aluno Form");
    this.alunoForm = this.formBuilder.group({
      nome: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      cpf: ['', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ])],
      matricula: ['', Validators.compose([
        Validators.required
      ])],
      formaIngresso: ['', Validators.compose([
        Validators.required
      ])]
    });
  }
  createDisciplinaForm() {
    this.alunoForm = this.formBuilder.group({
      descricao: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300)
      ])],
      sigla: ['', Validators.compose([
        Validators.required
      ])],
      cargaHoraria: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  close:  ThfModalAction = {
    action: () => {
      this.thfModal.close();
    },
    label: 'Cancelar'
  };

  confirm: ThfModalAction = {
    action: () => {
      console.log(this.alunoForm.value);
      this.thfModal.close();
    },
    label: 'Cadastrar'
  };

  public steps: Array<ThfStepperItem> = [
    { label: 'Informações Básicas' },
    { label: 'Adicionar Alunos' },
    { label: 'Adicionar Disciplinas' },
    { label: 'Confirmar Dados' },
  ];
  public options: Array<ThfSelectOption> = [
    { value:'1', label: 'Matutino'  },
    { value:'2', label: 'Vespertino' },
    { value:'3', label: 'Noturno'},
  ];

  public formaIngressoOptions: Array<ThfSelectOption> = [
    { value: FormaIngresso.ENEM, label: 'Enem'  },
    { value:FormaIngresso.VESTIBULAR, label: 'Vestibular' },
    { value:FormaIngresso.TRANSFERENCIA, label: 'Transferência'},
  ];

  changeStep(stepNumber: number) {
    const steps = this.steps[this.step - 1];
    this.step = stepNumber;
    if (steps) {
      steps.status = ThfStepperStatus.Done;
    }
    if (stepNumber === 1 || stepNumber === 2 || stepNumber === 3) {
      this.labelWidget = 'Próximo';
    }
    else {
      this.labelWidget = 'Confirmar';
    }
  }

  onConfirmStep(stepNumber: number) {
    if (stepNumber >= 5) {
      this.submit();
    }
    this.changeStep(stepNumber);
  }

  submit() {
    console.log(this.turmaForm.value);
  }
}
