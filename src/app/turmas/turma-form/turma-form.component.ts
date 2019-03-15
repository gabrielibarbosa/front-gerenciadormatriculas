import { Component, ViewChild, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ThfModalAction, ThfModalComponent, ThfStepperItem, ThfStepperStatus, ThfRadioGroupOption, ThfCheckboxGroupOption, ThfSelectOption } from '@totvs/thf-ui';
import { Turma } from '../turma.model';

const API_URL = 'http://localhost:3000';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})
export class TurmaFormComponent implements OnInit{
 
  labelWidget: string;
  @ViewChild('sucessData') sucessData: ThfModalComponent;


  ngOnInit(): void {
    this.changeStep(1);
  }

  reactiveForm: FormGroup;
 // testeForm: FormGroup;

  step: number;

  @ViewChild('reactiveFormData') reactiveFormModal: ThfModalComponent;
  myGroup: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.createReactiveForm(new Turma());
  }

  createReactiveForm(turma: Turma) {
    this.reactiveForm = this.formBuilder.group({
      descricao: [turma.descricao],
      anoLetivo: [turma.anoLetivo],
      periodoLetivo: [turma.periodoLetivo],
      numeroVagas: [turma.numeroVagas],
    });
  }

    alunoForm(turma: Turma) {
    this.reactiveForm = this.formBuilder.group({
      matricula: [turma.descricao],
      anoLetivo: [turma.anoLetivo]
    });
  }

  public steps: Array<ThfStepperItem>  = [
    { label: 'Informações Básicas' },
    { label: 'Adicionar Alunos' },
    { label: 'Adicionar Disciplinas' },
    { label: 'Confirmar Dados' },
  ];

  changeStep(stepNumber: number) {
    const steps =  this.steps[this.step - 1];

    this.step = stepNumber;
    if (steps) {
      steps.status = ThfStepperStatus.Done;
    }

    const numSteps = stepNumber + 1;
  
      if ( numSteps === 1 ||  numSteps === 2 ||  numSteps === 3) {
        console.log( numSteps);
  
        this.labelWidget = 'Próximo';
      } else {
        this.labelWidget = 'Confirmar';
        console.log(numSteps);
      }
  }

  onConfirmStep(stepNumber: number) {
    if (stepNumber >= 5) {
      this.sucessData.open();
    }
    this.changeStep(stepNumber);
  }

  submit() {
    console.log(this.reactiveForm.value);
  }
}
