import { Component } from '@angular/core';

import { ThfMenuItem } from '@totvs/thf-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<ThfMenuItem> = [
    { label: 'Inicial', link: '/home' },
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
        { label: 'Adicionar Professor', link: '/professores/adicionar' },
      ]
    },
    {
      label: 'Alunos', link: '/professores',
      subItems: [
        { label: 'Listar Alunos', link: '/alunos' },
        { label: 'Adicionar Aluno', link: '/alunos/adicionar' },
      ]
    }


  ];

}
