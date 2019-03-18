import { Component, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThfModalAction, ThfModalComponent, ThfStepperItem, ThfStepperStatus, ThfRadioGroupOption, ThfCheckboxGroupOption, ThfSelectOption, ThfNotificationService } from '@totvs/thf-ui';
import { Turma } from '../turma.model';
import { Aluno, FormaIngresso } from 'src/app/alunos/aluno.model';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  disciplinaForm: FormGroup;
  // alunos: Array<ThfSelectOption> = [];
  step: number;

  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;
  cargaHoraria: any;
  matricula: any;
  descricao: any;
  dadosFinais: Array<String> = []
  error: string;
  sucess: string;

  constructor(private formBuilder: FormBuilder,
     public httpClient: HttpClient,
      private router: Router,
      private thfNotification: ThfNotificationService) {
    this.createTurmaForm(new Turma());
    this.createAlunoForm();
    this.createDisciplinaForm();
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
    this.disciplinaForm = this.formBuilder.group({
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

      // this.thfNotification.error(`Please fill in the required fields`);
    }
    this.changeStep(stepNumber);
  }

  submit() {
    //submetendo a turma e seus dados complementares
    const descricao = this.turmaForm.get('descricao').value;
    const anoLetivo = this.turmaForm.get('anoLetivo').value;
    const periodoLetivo = this.turmaForm.get('periodoLetivo').value;
    const numeroVagas = this.turmaForm.get('numeroVagas').value;

    let data: String;

    this.httpClient.post(API_URL+"/turma/adicionar", data).subscribe( () => {
      if (this.fromUrl) {
        console.log("Deu boa");
      } else {
          this.router.navigate(['']);
      }
  },
  err => {
      console.log(err);
      alert('Invalid user name or password');
  })


  }
  fromUrl(fromUrl: any): any {
    throw new Error("Method not implemented.");
  }

}