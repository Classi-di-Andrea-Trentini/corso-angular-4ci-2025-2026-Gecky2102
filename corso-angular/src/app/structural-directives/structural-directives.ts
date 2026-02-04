import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-structural-directives',
  imports: [],
  templateUrl: './structural-directives.html',
  styleUrl: './structural-directives.css'
})
export class StructuralDirectives {

  visualizza: WritableSignal<boolean> = signal(false);
  immagineOTesto: WritableSignal<string> = signal('spiderman.jpg');
  spidermans: WritableSignal<string> = signal('spiderman.jpg');
  gormiti: WritableSignal<string[]> = signal(['Riff', 'Ikor', 'Eron', 'Trek']);
  indiceModifica: WritableSignal<number> = signal(-1);

  toggleVisualizza(): void {
    this.visualizza.update(current => !current);
  }

  vaiAImmagine(): void {
    this.immagineOTesto.set('spiderman.jpg');
  }
  vaiATesto(): void {
    this.immagineOTesto.set('🕸️🕷️');
  }

  aggiungiGormita( nome: string ): void {
    if (nome === '') {
      return;
    }

    if (this.gormiti().includes(nome)) {
      return;
    }

    this.gormiti.update( listaAttuale => {
      return [...listaAttuale, nome];
    });
  }

  cancellaGormita( indice: number ): void {
    this.gormiti.update( listaAttuale => {
      return listaAttuale.filter( (gormita, i) => i !== indice );
    });
  }

  attivaModifica( indice: number ): void {
    this.indiceModifica.set(indice);
  }

  annullaModifica(): void {
    this.indiceModifica.set(-1);
  }

  salvaModifica( indice: number, nuovoNome: string ): void {
    if (nuovoNome === '') {
      return;
    }

    if (this.gormiti().includes(nuovoNome)) {
      return;
    }

    this.gormiti.update( current => {
      const nuovoArray = [...current];
      nuovoArray[indice] = nuovoNome;
      return nuovoArray;
    });

    this.indiceModifica.set(-1);
  }
}
