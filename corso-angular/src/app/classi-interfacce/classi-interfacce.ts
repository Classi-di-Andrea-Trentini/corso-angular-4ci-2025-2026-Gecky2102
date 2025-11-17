import { Component, signal, WritableSignal } from '@angular/core';
import { ClasseScolastica } from './classe-scolastica';
import { Studente } from './studente';
import { timer } from 'rxjs';

@Component({
  selector: 'app-classi-interfacce',
  imports: [],
  templateUrl: './classi-interfacce.html',
  styleUrl: './classi-interfacce.css'
})
export class ClassiInterfacce {
  classe: WritableSignal<ClasseScolastica | undefined> = signal(undefined)
  id: number = 1;
  visualizzaErrore: WritableSignal<string> = signal('');


  creaClasse(nomeClasse: string, annoScolastico: string): void {
    
    try {
      this.classe.set(new ClasseScolastica(nomeClasse, annoScolastico));
    } catch (error: any) {
      this.visualizzaErrore.set(error.message);
      timer(4000).subscribe(() => {
        this.visualizzaErrore.set('');
      });
    }
  
  }

  aggiungiStudente(nome: string, cognome: string, sesso: string): void {

    try {

      // Controllo che non sia già esistente in questa classe
      if (this.classe()!._studenti.find(s => s.nome === nome && s.cognome === cognome)) {
        return;
      }

      this.classe()!.aggiungiStudente(new Studente(
          this.id,
          nome,
          cognome,
          sesso,
          this.classe()!.nomeClasse
        )
      );
      this.id++;
    } catch (error: any) {
      this.visualizzaErrore.set(error.message);
      timer(4000).subscribe(() => {
        this.visualizzaErrore.set('');
      });
    }
  }

}
