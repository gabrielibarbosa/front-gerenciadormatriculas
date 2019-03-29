import { Component, ViewChild, OnInit } from '@angular/core';

import { FormGroup, NgForm } from '@angular/forms';
import { ThfModalAction, ThfModalComponent, ThfStepperItem, ThfStepperStatus, ThfRadioGroupOption, ThfCheckboxGroupOption, ThfSelectOption, ThfNotificationService, ThfMultiselectOption, ThfTableColumn, ThfTableComponent } from '@totvs/thf-ui';
import { FormaIngresso, Aluno } from 'src/app/alunos/aluno.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlunoService } from 'src/app/provider/alunos/aluno.service';
import { DisciplinaService } from 'src/app/provider/disciplinas/disciplina.service';
import { Disciplina } from 'src/app/disciplinas/disciplina.models';
import { TurmaService } from 'src/app/provider/turmas/turma.service';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})
export class TurmaFormComponent implements OnInit {

  @ViewChild('sucessData') sucessData: ThfModalComponent;
  @ViewChild(ThfTableComponent) thfTable: ThfTableComponent;
  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;
  @ViewChild('formAluno') alunoForm: NgForm;
  @ViewChild('formDisciplina') disciplinaForm: NgForm;

  //
  formTurma: FormGroup;
  formAluno: FormGroup;
  formDisciplina: FormGroup;

  //Variaveis para listar dados
  alunos: Array<Aluno> = [];
  disciplinas: Array<Disciplina> = [];


  disciplina: any = {};
  turma: any = {};
  aluno: any = {};
  step: number;
  dadosFinais: Array<String> = []
  error: string;
  sucess: string;
  total: number = 0;

  alunoAdicionado: Array<any> = [];
  disciplinaAdicionada: Array<any> = [];


  buttonWidget: string;

  constructor(
    public httpClient: HttpClient,
    private router: Router,
    private thfNotification: ThfNotificationService,
    private alunoService: AlunoService,
    private disciplinaService: DisciplinaService,
    private turmaService: TurmaService
  ) {
    this.changeStep(1);
    this.alunosList();
    this.disciplinasList();
  }

  ngOnInit(): void {
    this.alunosList();
    this.disciplinasList();
  }

  //Array dos titulos dos steps
  public steps: Array<ThfStepperItem> = [
    { label: 'Informações Básicas' },
    { label: 'Adicionar Alunos' },
    { label: 'Adicionar Disciplinas' },
  ];

  //Array itens dos selects
  public periodoLetivo: Array<ThfSelectOption> = [
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

  //Funções para listar alunos e disciplinas na tela
  alunosList() {
    this.alunoService.getAlunos().subscribe((res) => {
      this.alunos = res;
    });
  }
  disciplinasList() {
    this.disciplinaService.getDisciplinas().subscribe((res) => {
      this.disciplinas = res;
    });
  }

  //Funcao para mudar os steps
  changeStep(stepNumber: number) {
    const steps = this.steps[this.step - 1];
    this.step = stepNumber;
    if (steps) {
      steps.status = ThfStepperStatus.Done;
    }
    if (stepNumber === 1 || stepNumber === 2) {
      this.buttonWidget = 'Próximo';
    }
    else {
      this.buttonWidget = 'Confirmar';
    }
  }

  //Funcao de confirmacao do ultimo step
  onConfirmStep(stepNumber: number) {
    if (stepNumber >= 4) {
      this.submit();
    }
    this.changeStep(stepNumber);
  }

  submit() {
    this.turmaService.postTurma(this.turma).subscribe((res) => {
      this.thfNotification.success(`Turma adicionada com sucesso!`);
    });
    this.router.navigate(['']);

  }

  //Acoes para abrir e fechar modal de Aluno e Disciplina 
  closeDisciplina: ThfModalAction = {
    action: () => {
      this.disciplinaForm.reset();
      this.thfModal.close();
    },
    label: 'Cancelar',
    danger: true
  };

  confirmDisciplina: ThfModalAction = {
    action: () => {
      this.cadastrarDisciplinas();
    },
    label: 'Confirmar'
  };

  closeAluno: ThfModalAction = {
    action: () => {
      this.alunoForm.reset();
      this.thfModal.close();
    },
    label: 'Cancelar',
    danger: true
  };

  confirmAluno: ThfModalAction = {
    action: () => {
      this.cadastrarAlunos();
    },
    label: 'Confirmar'
  };

  //Funcoes para cadastrar alunos e disciplinas
  cadastrarAlunos() {
    if (this.alunoForm.invalid) {

      this.thfNotification.warning("Dados inválidos, confira se preencheu o formulário corretamente!")
    } else {
      this.alunoAdicionado.push(this.aluno);
      this.alunoService.postAluno(this.alunoAdicionado).subscribe((res) => {
        console.log("teste disciplinas" + res);
        this.thfNotification.success(`Disciplina adicionada com sucesso!`);
      });
      this.alunoForm.reset();
      this.thfModal.close();
    }
  }

  cadastrarDisciplinas() {
    if (this.disciplinaForm.invalid) {
      this.thfNotification.warning("Dados inválidos, confira se preencheu o formulário corretamente!")
    } else {

      this.disciplinaAdicionada.push(this.disciplina);
      this.disciplinaService.postDisciplina(this.disciplinaAdicionada).subscribe((res) => {
        this.thfNotification.success(`Disciplina adicionada com sucesso!`);
      });
      this.disciplinaForm.reset();
      this.thfModal.close();
    }
  }

  //Para selecionar alunos

  selecionarAluno(row: any) {
    if (row.value) {
      this.alunoAdicionado.concat(row);
      console.log(this.alunoAdicionado);
    }
  }

  addToCart() {
    this.alunoService.postAluno(this.alunoAdicionado).subscribe((res) => {
      console.log("teste disciplinas" + res);
      this.thfNotification.success(`Disciplina adicionada com sucesso!`);
    });
  }

  addToCart2() {
    const selectedItems = this.thfTable.getSelectedRows();
    console.log(selectedItems);
    //criar código pra subir os alunos
    this.cadastrarDisciplinas();
  }
}