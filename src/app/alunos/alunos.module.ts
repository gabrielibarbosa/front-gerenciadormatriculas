import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosRoutingModule } from './alunos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AlunoListComponent } from './aluno-list/aluno-list.component';

@NgModule({
  declarations: [AlunoListComponent],
  imports: [
    CommonModule,
    SharedModule,
    AlunosRoutingModule
  ]
})
export class AlunosModule { }
