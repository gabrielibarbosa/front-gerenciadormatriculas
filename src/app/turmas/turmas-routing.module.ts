import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurmaListComponent } from './turma-list/turma-list.component';

const routes: Routes = [
  { path: '', component: TurmaListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurmasRoutingModule { }
