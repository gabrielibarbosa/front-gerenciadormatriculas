import { Injectable } from '@angular/core';
import { Disciplina } from 'src/app/disciplinas/disciplina.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  constructor(private httpClient: HttpClient) { }

  getDisciplinas (): Observable<Disciplina[]> {
    return this.httpClient.get<Disciplina[]>(API_URL+"/disciplinas/listar")
      .pipe(
        tap(disciplinas => {
        return disciplinas;
        })
      );
  }

  postDisciplina(disciplina, professor): Observable<Disciplina> {
    let data={
      'id': null,
      'descricao':disciplina.descricao,
      'sigla': disciplina.sigla,
      'cargaHoraria': disciplina.cargaHoraria,
      'turmas': null,
        'professor': professor
    }
     console.log(data);
    return this.httpClient.post<Disciplina>(API_URL+"/disciplinas/", data)
      .pipe(
        tap((disciplina) => console.log("Disciplina adicionada com sucesso"+disciplina)),
        catchError(this.handleError<Disciplina>('addDisciplina'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return error;
    };
  }
}
