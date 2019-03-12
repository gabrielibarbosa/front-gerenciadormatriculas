import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurmasRoutingModule } from './turmas-routing.module';
import { TurmaListComponent } from './turma-list/turma-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TurmaListComponent],
  imports: [
    CommonModule,
    SharedModule,
    TurmasRoutingModule
  ]
})
export class TurmasModule { }
