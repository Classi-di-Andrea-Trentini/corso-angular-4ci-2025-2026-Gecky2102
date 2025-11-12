import { Persona } from './persona';

export class Studente extends Persona {

    private _classe: string = '';

    constructor(id: number, nome: string, cognome: string, sesso: string, classe: string) {
        // Super richiama il costruttore della classe base genitore ovvvero Persona
        super(id, nome, cognome, sesso);
        this.classe = classe;
    }

    public getClasse(): string {
        return this._classe;
    }

    public setClasse(classe: string): void {
        this._classe = classe;
    }

    public set classe(value: string) {
        const regex = /^[1-5][ABCDEQ][iame]?$/;

        if (regex.test(value)) {
            this._classe = value;
        } else {
            throw new Error('Classe non valida!!');
        }
    }

    public override toTable(): string {
        return '<tr><td scope="row">' + this.id + '</td><td>' + this.nome + '</td><td>' + this.cognome + '</td><td>' + this.sesso + '</td><td>' + this._classe + '</td></tr>';
    }

}
