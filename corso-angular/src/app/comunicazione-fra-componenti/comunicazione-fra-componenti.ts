import { Component, signal, WritableSignal } from '@angular/core';
import { VisualizzaElenco } from './visualizza-elenco/visualizza-elenco';
import { IDocente } from '../classi-interfacce/i-docente';

@Component({
  selector: 'app-comunicazione-fra-componenti',
  imports: [VisualizzaElenco],
  templateUrl: './comunicazione-fra-componenti.html',
  styleUrl: './comunicazione-fra-componenti.css'
})
export class ComunicazioneFraComponenti {

  docenti: WritableSignal<IDocente[]> = signal([]);

  aggiungiDocenti() {
    const elencoDocenti: IDocente[] = [
      {id: 1, nome: 'Andrea', cognome: 'Trentini', classi: [], materie: []},
      {id: 2, nome: 'Federico', cognome: 'Sannicolò', classi: [], materie: []},
      {id: 3, nome: 'Denis', cognome: 'Tairovski', classi: [], materie: []},
      {id: 4, nome: 'Mauro', cognome: 'Longano', classi: [], materie: []},
      {id: 5, nome: 'Federico', cognome: 'Bertolli', classi: [], materie: []},
      {id: 6, nome: 'Patrizia', cognome: 'Montagni', classi: [], materie: []}
    ];
    this.docenti.set(elencoDocenti);
  }

}
