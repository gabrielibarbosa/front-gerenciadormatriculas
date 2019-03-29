import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlunoService } from 'src/app/provider/alunos/aluno.service';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {
  private readonly url: string = 'http://localhost:3000/alunos/listar'
  private alunosSub: Subscription;

  private alunos: Array<any> = [];
  private turmas: Array<any> = [];

  constructor(private http: HttpClient,
              private alunoService: AlunoService) { }

  ngOnInit() {
     this.alunosList();
  }

  alunosList(){
    this.alunoService.getAlunos().subscribe((res)=>{
      this.alunos =  res;
    });
  }
}
