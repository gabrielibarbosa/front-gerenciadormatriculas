import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {

  private readonly url: string = 'http://localhost:3000/professores/listar'
  private professoresSub: Subscription;

  private professores: Array<any> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
     this.professoresSub = this.http.get(this.url).subscribe((response:any)=>{
      console.log("To aqui"+ response);
      this.professores =  response;
    });

  }

}
