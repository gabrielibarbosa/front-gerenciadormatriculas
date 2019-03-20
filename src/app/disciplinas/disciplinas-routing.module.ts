import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisciplinaFormComponent } from './disciplina-form/disciplina-form.component';


const routes: Routes = [
  { path: '', component: DisciplinaFormComponent},
  // { path:'adicionar', component: ProfessorFormComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplinasRoutingModule { }
