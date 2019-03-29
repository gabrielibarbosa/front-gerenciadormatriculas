import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Turma } from 'src/app/turmas/turma.model';
import { catchError, tap, map } from 'rxjs/operators';
import {  ThfNotificationService } from '@totvs/thf-ui';

const API_URL = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  constructor(public httpClient: HttpClient,
    private thfNotification: ThfNotificationService,) { }


  postAluno(data): Observable<Turma> {
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
