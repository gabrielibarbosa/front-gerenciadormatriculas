import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluno } from 'src/app/alunos/aluno.model';
import { Observable } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';

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

  postAluno(data): Observable<Aluno> {
    return this.httpClient.post<Aluno>(API_URL+"/alunos/", data)
      .pipe(
        tap((aluno) => console.log("Aluno adicionada com sucesso"+aluno)),
        catchError(this.handleError<Aluno>('addAluno'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return error;
    };
  }
}
