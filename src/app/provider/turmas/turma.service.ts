import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from 'src/app/turmas/turma.model';
import { catchError, tap } from 'rxjs/operators';

const API_URL = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  constructor(public httpClient: HttpClient) { }

  getTurmas(): Observable<Turma[]> {
    return this.httpClient.get<Turma[]>(API_URL+"/turmas/listar")
      .pipe(
        tap(turma => {
        return turma;
        })
      );
  }

  postTurma(data): Observable<Turma> {
    return this.httpClient.post<Turma>(API_URL+"/turmas/", data)
      .pipe(
        tap((turma) => console.log("Turma adicionada com sucesso"+turma)),
        catchError(this.handleError<Turma>('addProduto'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
     
      return error;
    };
  }
}
