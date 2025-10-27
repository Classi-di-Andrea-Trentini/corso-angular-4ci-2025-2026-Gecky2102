import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-bindings',
  imports: [],
  templateUrl: './bindings.html',
  styleUrl: './bindings.css'
})
export class Bindings {
  // Dichiarazione delle variabili prevede: nome: tipo = valore iniziale
  studente: WritableSignal<string> = signal("Giacomo Masiero");

  cambiaNome(): void {
    // Corpo del metodo
    this.studente.set("Gabriele Pittui");
  }

}
