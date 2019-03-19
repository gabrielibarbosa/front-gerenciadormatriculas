import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PessoaFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    PessoaRoutingModule
  ]
})
export class PessoaModule { }
