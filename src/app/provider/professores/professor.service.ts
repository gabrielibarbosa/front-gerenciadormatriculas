import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/professores/professor.models';
import { tap, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(public httpClient: HttpClient) { }

  getProfessores(): Observable<Professor[]> {
    return this.httpClient.get<Professor[]>(API_URL+"/professores/listar")
      .pipe(
        tap(professor => {
        return professor;
        })
      );
  }

  postProfessor(data): Observable<Professor> {
    return this.httpClient.post<Professor>(API_URL+"/professores/", data)
      .pipe(
        tap((professor) => console.log("Professor adicionada com sucesso"+professor)),
        catchError(this.handleError<Professor>('addProfessor'))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
     
      return error;
    };
  }
}
