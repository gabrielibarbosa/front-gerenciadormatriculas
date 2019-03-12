import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThfModule } from '@totvs/thf-ui';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThfModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ThfModule
  ]
})
export class SharedModule { }
