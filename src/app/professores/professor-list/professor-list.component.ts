import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfessorService } from 'src/app/provider/professores/professor.service';
import { ThfSelectOption, ThfModalAction, ThfModalComponent, ThfNotificationService } from '@totvs/thf-ui';
import { TipoTitulacao, Professor } from '../professor.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {

  private professores: Array<Professor> = [];
  professor: any = {};

  @ViewChild('formProfessor') professorForm: NgForm;
  @ViewChild(ThfModalComponent) thfModal: ThfModalComponent;


  constructor(private http: HttpClient,
              private professorService: ProfessorService,
              private thfNotification: ThfNotificationService,) { }

  ngOnInit() {
    this.professorList();
  }

  professorList(){
    this.professorService.getProfessores().subscribe((res) => {
      this.professores = res;
    
    });
  }

  public titulacaoOptions: Array<ThfSelectOption> = [
    { value: TipoTitulacao.MESTRE, label: 'Mestre' },
    { value: TipoTitulacao.DOUTOR, label: 'Doutor' },
    { value: TipoTitulacao.PHD, label: 'PHD' },
  ];

  close: ThfModalAction = {
    action: () => {
      this.professorForm.reset();
      this.thfModal.close();
    },
    label: 'Cancelar',
    danger: true
  };

  confirm: ThfModalAction = {
    action: () => {
      this.cadastrarProfessor();
    },
    label: 'Confirmar'
  };

  cadastrarProfessor() {
    if (this.professorForm.invalid) {
      this.thfNotification.warning("Dados inválidos, confira se preencheu o formulário corretamente!")
    } else {

      this.professorService.postProfessor(this.professor).subscribe((res) => {
        this.thfNotification.success(`Professor adicionado com sucesso!`);
      });
      this.professorForm.reset();
      this.thfModal.close();
      this.professorList();
    }
  }
}
