import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessoresRoutingModule } from './professores-routing.module';
import { ProfessorListComponent } from './professor-list/professor-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfessorListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfessoresRoutingModule
  ]
})
export class ProfessoresModule { }
