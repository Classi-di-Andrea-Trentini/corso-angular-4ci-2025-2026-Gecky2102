import { Persona } from './persona';

export class Studente extends Persona {

    private classe: string;

    constructor(id: number, nome: string, cognome: string, sesso: string, classe: string) {
        // Super richiama il costruttore della classe base genitore ovvvero Persona
        super(id, nome, cognome, sesso);
        this.classe = classe;
    }

    public getClasse(): string {
        return this.classe;
    }

    public setClasse(classe: string): void {
        this.classe = classe;
    }

    public cambiaClasse(value: string): void {
        this.classe = value;
    }
}
