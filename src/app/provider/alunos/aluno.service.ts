import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Aluno } from 'src/app/alunos/aluno.model';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(public httpClient: HttpClient) { }


  getAlunos (): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(API_URL+"/alunos/listar")
      .pipe(
        tap(alunos => {
        return alunos;
        })
      );
  }
 


}
