import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThfMultiselectOption, ThfNotificationService } from '@totvs/thf-ui';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})
export class TurmaFormComponent implements OnInit, OnDestroy {


  public turma: any = { };
  private turmaSub: Subscription;
  private readonly url: string = 'https://localhost:3000/turmas/adicionar';


  constructor(private httpClient: HttpClient,
    private thfNotification: ThfNotificationService,
    private router: Router,) { }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.turmaSub.unsubscribe();
  }
  save(){
    this.turmaSub = this.httpClient.post(this.url, this.turma).subscribe(() => {
      // EXIBE UMA NOTIFICAÇÃO DE SUCESSO
      this.thfNotification.success('Cliente cadastrado com sucesso');

      // REDIRECIONA A PÁGINA PARA A LISTAGEM DE CLIENTES
      this.router.navigateByUrl('/turmas');
    });
  }

}
