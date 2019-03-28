import { Component, ViewChild, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThfModalAction, ThfModalComponent, ThfStepperItem, ThfStepperStatus, ThfRadioGroupOption, ThfCheckboxGroupOption, ThfSelectOption, ThfNotificationService, ThfMultiselectOption, ThfTableColumn, ThfTableComponent } from '@totvs/thf-ui';
import { Turma } from '../turma.model';
import { Aluno, FormaIngresso } from 'src/app/alunos/aluno.model';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:3000';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})

export class TurmaFormComponent implements OnInit {
  
  ngOnInit(): void {
    this.alunosList();
    this.disciplinasList();
  }

  @ViewChild('sucessData') sucessData: ThfModalComponent;

  private alunosSub: Subscription;
  private professorSub: Subscription;
  private disciplinasSub: Subscription;

  formTurma: FormGroup;
  formAluno: FormGroup;
  formDisciplina: FormGroup;
  labelWidget: string;

  disciplina: any = {};
  turma: any = {};
  aluno: any = {};
  step: number;
  dadosFinais: Array<String> = []
  error: string;
  sucess: string;
  alunos: Array<String> = [];
  total: number = 0;
  disciplinas: Array<String> = [];

  @ViewChild(ThfTableComponent) thfTable: ThfTableComponent;
  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;


  constructor(private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    private router: Router,
    private thfNotification: ThfNotificationService) {
    this.changeStep(1);
    this.alunos;
  }

  public steps: Array<ThfStepperItem> = [
    { label: 'Informações Básicas' },
    { label: 'Adicionar Alunos' },
    { label: 'Adicionar Disciplinas' },
  ];
  public options: Array<ThfSelectOption> = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },

  ];

  public formaIngressoOptions: Array<ThfSelectOption> = [
    { value: FormaIngresso.ENEM, label: 'Enem' },
    { value: FormaIngresso.VESTIBULAR, label: 'Vestibular' },
    { value: FormaIngresso.TRANSFERENCIA, label: 'Transferência' },
  ];

  alunosList(){
    this.alunosSub = this.httpClient.get(API_URL + "/alunos/listar").subscribe((response: any) => {
      this.alunos = response;
    });
  }

  disciplinasList() {
    this.disciplinasSub = this.httpClient.get(API_URL + "/disciplinas/listar").subscribe((response: any) => {
      this.disciplinas = response;
    });
  }

  close: ThfModalAction = {
    action: () => {
      this.thfModal.close();
    },
    label: 'Cancelar'
  };

  confirm: ThfModalAction = {
    action: () => {
     this.cadastrarDisciplinas(this.disciplina);
     this.thfModal.close();
     this.disciplinasList();
    },
    label: 'Confirmar'
  };

  closeAluno: ThfModalAction = {
    action: () => {
      this.thfModal.close();
    },
    label: 'Cancelar'
  };

  confirmAluno: ThfModalAction = {
    action: () => {
     this.cadastrarAlunos(this.aluno);
     this.thfModal.close();
    },
    label: 'Confirmar'
  };

  changeStep(stepNumber: number) {
    const steps = this.steps[this.step - 1];
    this.step = stepNumber;
    if (steps) {
      steps.status = ThfStepperStatus.Done;
    }
    if (stepNumber === 1 || stepNumber === 2) {
      this.labelWidget = 'Próximo';
    }
    else {
      this.labelWidget = 'Confirmar';
    }
  }

  onConfirmStep(stepNumber: number) {
    if (stepNumber >= 4) {
      this.submit();
      this.router.navigate(['']);
      this.thfNotification.success(`Turma adicionada com sucesso!`);
    }
    this.changeStep(stepNumber);
  }

  submit() {
    console.log(this.turma);
    this.add(this.turma);
  }

  public add(turma) {
      this.httpClient.post(API_URL + "/turmas/", turma).subscribe((res) => {
        console.log("teste" + res)
      });
  }

  cadastrarAlunos(data){
    this.httpClient.post(API_URL + "/alunos", data).subscribe((res) => {
      console.log("teste alunos" + res);
      this.thfNotification.success(`Aluno adicionado com sucesso!`);
    });
  }

  cadastrarDisciplinas(data){
    this.httpClient.post(API_URL + "/disciplinas/", data).subscribe((res) => {
      console.log("teste disciplinas" + res);
      this.thfNotification.success(`Disciplina adicionada com sucesso!`);

    });
  }

  addToCart() {
    const selectedItems = this.thfTable.getSelectedRows();
    console.log(selectedItems);
    //criar código pra subir os alunos
    this.cadastrarAlunos(selectedItems);
  
  }

  addToCart2() {
    const selectedItems = this.thfTable.getSelectedRows();
    console.log(selectedItems);
    //criar código pra subir os alunos
    this.cadastrarDisciplinas(selectedItems);

  }


}