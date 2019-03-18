import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessoresRoutingModule } from './professores-routing.module';
import { ProfessorFormComponent } from './professor-form/professor-form.component';

@NgModule({
  declarations: [ProfessorFormComponent],
  imports: [
    CommonModule,
    ProfessoresRoutingModule
  ]
})
export class ProfessoresModule { }
