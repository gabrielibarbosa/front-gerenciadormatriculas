import { Component } from '@angular/core';

import { ThfMenuItem } from '@totvs/thf-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<ThfMenuItem> = [
    {
      label: 'Turmas', link: '/turmas',
      subItems: [
        { label: 'Listar Turmas', link: '/turmas' },
        { label: 'Adicionar Turma', link: '/turmas/adicionar' },
      ]
    },
    {
      label: 'Professores', link: '/professores',
      subItems: [
        { label: 'Listar Professores', link: '/professores' },
      ]
    },
    {
      label: 'Alunos', link: '/alunos',
      subItems: [
        { label: 'Listar Alunos', link: '/alunos' },
      ]
    }


  ];

}
