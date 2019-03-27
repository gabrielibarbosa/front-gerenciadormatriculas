import { Component, ViewChild, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThfModalAction, ThfModalComponent, ThfStepperItem, ThfStepperStatus, ThfRadioGroupOption, ThfCheckboxGroupOption, ThfSelectOption, ThfNotificationService, ThfMultiselectOption, ThfTableColumn, ThfTableComponent } from '@totvs/thf-ui';
import { Turma } from '../turma.model';
import { Aluno, FormaIngresso } from 'src/app/alunos/aluno.model';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';


const API_URL = 'http://localhost:3000';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})

export class TurmaFormComponent implements OnInit {
  professorSub: Subscription;
  disciplinasSub: Subscription;
  ngOnInit(): void {

    this.alunosSub = this.httpClient.get(API_URL + "/alunos/listar").subscribe((response: any) => {
      console.log("To aqui" + response);
      this.alunos = response;
    });

    this.disciplinasList();

  }

  disciplinasList() {
    this.disciplinasSub = this.httpClient.get(API_URL + "/disciplinas/listar").subscribe((response: any) => {
      console.log("Disciplinas" + response);
      this.disciplinas = response;
    });
  }


  labelWidget: string;
  @ViewChild('sucessData') sucessData: ThfModalComponent;

  private alunosSub: Subscription;

  formTurma: FormGroup;
  formAluno: FormGroup;
  formDisciplina: FormGroup;

  disciplina: any = {};
  turma: any = {};
  aluno: any = {};

  step: number;
  @ViewChild(ThfTableComponent) thfTable: ThfTableComponent;

  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;
  cargaHoraria: any;
  matricula: any;
  descricao: any;
  dadosFinais: Array<String> = []
  error: string;
  sucess: string;
  alunos: Array<String> = [];
  total: number = 0;
  teste = this.alunosSub;
  disciplinas: Array<String> = [];
  constructor(private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    private router: Router,
    private thfNotification: ThfNotificationService) {
    this.changeStep(1);
  }


  addToCart() {
    const selectedItems = this.thfTable.getSelectedRows();
    console.log(selectedItems);
    //criar código pra subir os alunos
  }

  addToCart2() {
    const selectedItems = this.thfTable.getSelectedRows();
    console.log(selectedItems);
    //criar código pra subir os alunos
  }

  close: ThfModalAction = {
    action: () => {
      this.thfModal.close();
    },
    label: 'Cancelar'
  };

  public readonly columns: Array<ThfTableColumn> = [
    // Definição das colunas
  ];

  public steps: Array<ThfStepperItem> = [
    { label: 'Informações Básicas' },
    { label: 'Adicionar Alunos' },
    { label: 'Adicionar Disciplinas' },
  ];
  public options: Array<ThfSelectOption> = [
    { value: '1', label: 'Matutino' },
    { value: '2', label: 'Vespertino' },
    { value: '3', label: 'Noturno' },
  ];

  public formaIngressoOptions: Array<ThfSelectOption> = [
    { value: FormaIngresso.ENEM, label: 'Enem' },
    { value: FormaIngresso.VESTIBULAR, label: 'Vestibular' },
    { value: FormaIngresso.TRANSFERENCIA, label: 'Transferência' },
  ];


  public alunosOptions: Array<ThfMultiselectOption> = [

  ];

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
    console.log("oi eu to aqui");
    console.log(JSON.stringify(turma));
    let data = {
      'turma': turma
    }

    this.httpClient.post(API_URL + "/turmas/add/", data, { responseType: 'text' }).subscribe((res) => {
      console.log("teste" + res)
    });

  }
}