import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplinasRoutingModule } from './disciplinas-routing.module';
import { DisciplinaFormComponent } from './disciplina-form/disciplina-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DisciplinaFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    DisciplinasRoutingModule
  ]
})
export class DisciplinasModule { }
