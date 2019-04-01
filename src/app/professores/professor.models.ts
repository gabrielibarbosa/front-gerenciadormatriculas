import { Pessoa } from "../pessoa/pessoa.models";
import { Disciplina } from "../disciplinas/disciplina.models";

export class Professor extends Pessoa{
    titulacao: String;
    disciplinas: Array<Disciplina> = [];
    id_pessoa: number;
}

export enum TipoTitulacao{
    MESTRE, DOUTOR, PHD

}