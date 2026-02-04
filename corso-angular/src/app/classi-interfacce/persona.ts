export class Persona {
    // attributi della classe
    private _id: number;
    private _nome: string = '';
    private _cognome: string = '';
    private _sesso: string;

    constructor(id: number, nome: string, cognome: string, sesso: string) {
        this._id = id;
        this.nome = nome;
        this.cognome = cognome;
        this._sesso = sesso;
    }

    public get id(): number {
        return this._id;
    }
    public get nome(): string {
        return this._nome;
    }
    public get cognome(): string {
        return this._cognome;
    }
    public get sesso(): string {
        return this._sesso;
    }

    public getNomeCompleto(): string {
        return this._nome + ' ' + this._cognome;
    }

    public set nome(value: string) {
        if (value.length > 0) {
            this._nome = value;
        } else {
            throw new Error('Nome non valido!!');
        }
    }
    public set cognome(value: string) {
        if (value.length > 0) {
            this._cognome = value;
        } else {
            throw new Error('Cognome non valido!!');
        }
    }
    public set sesso(value: string) {
        this._sesso = value;
    }

    public toString(): string {
        return `id: ${this._id}, nome: ${this._nome}, cognome: ${this._cognome}, sesso: ${this._sesso}`;
    }

    public toTable(): string {
        return '<tr><td scope="row">' + this._id + '</td><td>' + this._nome + '</td><td>' + this._cognome + '</td><td>' + this._sesso + '</td></tr>';
    }
    
}
