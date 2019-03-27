import { Disciplina } from "../disciplinas/disciplina.models";
import { Aluno } from "../alunos/aluno.model";

export class Turma {
    descricao: string;
    anoLetivo: Date;
    periodoLetivo: number;
    numeroVagas: number;

    disciplinas: Array<Disciplina> = [];
    alunos: Array<Aluno> = [];

}

