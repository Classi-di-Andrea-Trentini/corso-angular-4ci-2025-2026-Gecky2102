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

  contatore: WritableSignal<number> = signal(0);

  immagini: string[] = [
    '/bicicletta_1.jpg',
    '/bicicletta_2.jpg',
    '/bicicletta_3.jpg',
    '/bicicletta_4.jpg',
    '/bicicletta_5.jpg',
    '/bicicletta_6.jpg',
    '/bicicletta_7.jpg',
    '/bicicletta_8.jpg',
    '/bicicletta_9.jpg',
    '/bicicletta_10.jpg',
    '/bicicletta_11.jpg',
    '/bicicletta_12.jpg',
    '/bicicletta_13.jpg',
    '/bicicletta_14.jpg',
    '/bicicletta_15.jpg'
  ];
  indiceImmagine: WritableSignal<number> = signal(0);


  incrementaContatore(): void {

    // meglio di this.contatore.set(this.contatore() + 1);
    // più elegante e il metodo update acceta due paramentri:
    // il valore precedente e il nuovo valore
    this.contatore.update(valorePrecedente => valorePrecedente + 1);

  }

  decrementaContatore(): void {
    this.contatore.update(valorePrecedente => valorePrecedente - 1);
  }

  cambiaNome(): void {
    // Corpo del metodo
    this.studente.set("Gabriele Pittui");
  }

}
