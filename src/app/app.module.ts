import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AlunoFormComponent } from './alunos/aluno-form/aluno-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AlunoFormComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
