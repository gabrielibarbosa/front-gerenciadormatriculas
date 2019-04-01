import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TurmaService } from 'src/app/provider/turmas/turma.service';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css']
})
export class TurmaListComponent implements OnInit {
  private readonly url: string = 'http://localhost:3000/turmas/listar'
  private turmasSub: Subscription;

  private turmas: Array<any> = [];

  constructor(private http: HttpClient, private router: Router, private turmaService: TurmaService) { 
    this.turmaList();
   }

  ngOnInit() {
     this.turmaList();
  }

  turmaList(){
     this.turmaService.getTurmas().subscribe((response:any)=>{
      this.turmas =  response;
    });
  }

  cadastrarTurma(){
    this.router.navigate(['/turmas/adicionar']);
  }

}
