import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurmasRoutingModule } from './turmas-routing.module';
import { TurmaListComponent } from './turma-list/turma-list.component';
import { SharedModule } from '../shared/shared.module';
import { TurmaFormComponent } from './turma-form/turma-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TurmaListComponent, TurmaFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    TurmasRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TurmasModule { }
