import { Pessoa } from "../pessoa/pessoa.models";

export class Professor extends Pessoa{
    titulacao: String;
}

export enum TipoTitulacao{
    MESTRE, DOUTOR, PHD

}