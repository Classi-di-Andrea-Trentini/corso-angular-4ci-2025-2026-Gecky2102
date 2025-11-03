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
  gormiti: WritableSignal<string[]> = signal(['Riff 🔥', 'Ikor 🪨', 'Eron 🌊', 'Trek 🌿', 'Ao-Ki 💫']);


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

  cancellaGormita( nome: string ): void {
    this.gormiti.update( listaAttuale => {
      return listaAttuale.filter( gormita => gormita !== nome );
    });
  }

}
