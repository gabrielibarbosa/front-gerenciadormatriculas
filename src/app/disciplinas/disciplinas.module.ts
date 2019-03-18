import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplinasRoutingModule } from './disciplinas-routing.module';
import { DisciplinaFormComponent } from './disciplina-form/disciplina-form.component';

@NgModule({
  declarations: [DisciplinaFormComponent],
  imports: [
    CommonModule,
    DisciplinasRoutingModule
  ]
})
export class DisciplinasModule { }
