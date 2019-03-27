import { Turma } from "../turmas/turma.model";
import { Professor } from "../professores/professor.models";

export class Disciplina{
    descricao: String;
    sigla: String;
    cargaHoraria: number;

    turmas: Array<Turma> = [];
    professor: Professor;
}