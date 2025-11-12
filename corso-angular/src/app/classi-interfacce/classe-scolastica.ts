import { Studente } from "./studente";

export class ClasseScolastica {

    _studenti: Studente[] = [];
    _nomeClasse: string = '';
    _annoScolastico: string = '';

    constructor(nomeClasse: string, annoScolastico: string) {
        this.nomeClasse = nomeClasse;
        this._annoScolastico = annoScolastico;
    }

    public set nomeClasse(value: string) {
        const regex = /^[1-5][ABCDEQ][iame]?$/;

        if (regex.test(value)) {
            this._nomeClasse = value;
        } else {
            throw new Error('Nome classe non valido!!');
        }
    }

    public set annoScolastico(value: string) {
        const regex = /^20\d{2}\/20\d{2}$/;

        if (regex.test(value)) {
            this._annoScolastico = value;
        } else {
            throw new Error('Anno scolastico non valido!!');
        }
    }

    public getStudenti(): Studente[] {
        return this._studenti;
    }
    public get nomeClasse(): string {
        return this._nomeClasse;
    }
    public get annoScolastico(): string {
        return this._annoScolastico;
    }

    public aggiungiStudente(studente: Studente): void {
        studente.classe = this.nomeClasse;
        this._studenti.push(studente);
    }

    public eliminaStudente(index: number): void {
        this._studenti.splice(index, 1);
    }

    public modificaStudente(index: number, nuovo: Studente): void {
        nuovo.classe = this.nomeClasse;
        this._studenti[index] = nuovo;
    }

    public toTable(): string {
        let tmp = `<table class="table">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Età</th>
                            <th>Classe</th>
                            </tr>
                        </thead>
                        <tbody>
                    ` + this._studenti.map(studente => studente.toTable()).join('') +
                    `   </tbody>
                    </table>`;
        return tmp;

    }
}
