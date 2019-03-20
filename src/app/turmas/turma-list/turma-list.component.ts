import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css']
})
export class TurmaListComponent implements OnInit {
  private readonly url: string = 'http://localhost:3000/turmas/listar'
  private turmasSub: Subscription;

  private turmas: Array<any> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
     this.turmasSub = this.http.get(this.url).subscribe((response:any)=>{
      console.log("To aqui"+ response);
      this.turmas =  response;
    });

  }


}
