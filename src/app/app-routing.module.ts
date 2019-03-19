import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'alunos', loadChildren:'./alunos/alunos.module#AlunosModule'},
  { path: 'professores', loadChildren:'./professores/professores.module#ProfessoresModule'},

  { path: 'turmas', loadChildren:'./turmas/turmas.module#TurmasModule'},
  { path: '', redirectTo: '/turmas', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
