import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit() {
     this.alunosSub = this.http.get(this.url).subscribe((response:any)=>{
      console.log("To aqui"+ response);
      this.alunos =  response;
      for(let item of response){
        let turmas = item.turmas;
        for(let item of turmas){
          this.turmas = item;
        }
        console.log(this.turmas);
      }
    });
  }
}
