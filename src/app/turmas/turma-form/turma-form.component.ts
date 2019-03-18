import { Component, ViewChild, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ThfModalAction, ThfModalComponent, ThfStepperItem, ThfStepperStatus, ThfRadioGroupOption, ThfCheckboxGroupOption, ThfSelectOption } from '@totvs/thf-ui';
import { Turma } from '../turma.model';
import { Aluno } from 'src/app/alunos/aluno.model';

const API_URL = 'http://localhost:3000';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})
export class TurmaFormComponent {

  labelWidget: string;
  @ViewChild('sucessData') sucessData: ThfModalComponent;


  turmaForm: FormGroup;
  alunoForm: FormGroup;

  step: number;

  @ViewChild('reactiveFormData') reactiveFormModal: ThfModalComponent;
  myGroup: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.createTurmaForm(new Turma());
    this.changeStep(1);

  }

  createTurmaForm(turma: Turma) {
    this.turmaForm = this.formBuilder.group({
      descricao: [turma.descricao],
      anoLetivo: [turma.anoLetivo],
      periodoLetivo: [turma.periodoLetivo],
      numeroVagas: [turma.numeroVagas],
    });
  }

  createAlunoForm(aluno: Aluno) {
    this.alunoForm = this.formBuilder.group({
      matricula: [aluno.matricula],
      formaIngreso: [aluno.formaIngreso]
      
    });
  }

  public steps: Array<ThfStepperItem> = [
    { label: 'Informações Básicas' },
    { label: 'Adicionar Alunos' },
    { label: 'Adicionar Disciplinas' },
    { label: 'Confirmar Dados' },
  ];

  changeStep(stepNumber: number) {
    const steps = this.steps[this.step - 1];
    this.step = stepNumber;
    if (steps) {
      steps.status = ThfStepperStatus.Done;
    }
    if (stepNumber === 1 || stepNumber === 2 || stepNumber === 3) {
      this.labelWidget = 'Next Step';
    } else {
      this.labelWidget = 'Confirm Purchase';
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
