import { Pessoa } from "../pessoa/pessoa.models";

export class Aluno  extends Pessoa {
    matricula: number;
    formaIngreso: FormaIngresso;
}

export enum FormaIngresso{
    VESTIBULAR, ENEM, TRANSFERENCIA
}