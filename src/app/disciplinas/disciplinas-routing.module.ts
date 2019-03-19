import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfessorListComponent } from '../professores/professor-list/professor-list.component';
import { ProfessorFormComponent } from '../professores/professor-form/professor-form.component';


const routes: Routes = [
  { path: '', component: ProfessorListComponent},
  { path:'adicionar', component: ProfessorFormComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplinasRoutingModule { }
