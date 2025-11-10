export class Persona {
    // attributi della classe
    private _id: number;
    private _nome: string;
    private _cognome: string;
    private _sesso: string;

    constructor(id: number, nome: string, cognome: string, sesso: string) {
        this._id = id;
        this._nome = nome;
        this._cognome = cognome;
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
        this._nome = value;
    }
    public set cognome(value: string) {
        this._cognome = value;
    }
    public set sesso(value: string) {
        this._sesso = value;
    }

    public toString(): string {
        return `id: ${this._id}, nome: ${this._nome}, cognome: ${this._cognome}, sesso: ${this._sesso}`;
    }

}
