export class Aluno {
    matricula: number;
    formaIngreso: FormaIngresso;
}

export enum FormaIngresso{
    VESTIBULAR, ENEM, TRANSFERENCIA
}