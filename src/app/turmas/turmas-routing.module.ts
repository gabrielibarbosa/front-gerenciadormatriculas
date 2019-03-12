import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurmaListComponent } from './turma-list/turma-list.component';
import { TurmaFormComponent } from './turma-form/turma-form.component';

const routes: Routes = [
  { path: '', component: TurmaListComponent},
  { path:'adicionar', component:TurmaFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurmasRoutingModule { }
