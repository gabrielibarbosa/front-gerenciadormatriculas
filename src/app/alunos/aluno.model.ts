import { Pessoa } from "../pessoa/pessoa.models";
import { Turma } from "../turmas/turma.model";

export class Aluno  extends Pessoa {
    matricula: number;
    formaIngreso: FormaIngresso;

    turmas: Array<Turma> = [];
}

export enum FormaIngresso{
    VESTIBULAR, ENEM, TRANSFERENCIA
}