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
}
