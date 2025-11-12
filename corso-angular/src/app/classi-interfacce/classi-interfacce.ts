import { Component, signal, WritableSignal } from '@angular/core';
import { ClasseScolastica } from './classe-scolastica';

@Component({
  selector: 'app-classi-interfacce',
  imports: [],
  templateUrl: './classi-interfacce.html',
  styleUrl: './classi-interfacce.css'
})
export class ClassiInterfacce {
  classe!: WritableSignal<ClasseScolastica>;
  //  = signal(new ClasseScolastica('4Ci', '2025/2026'))


  creaClasse(nomeClasse: string, annoScolastico: string): void {
    
    try {
      this.classe.set(new ClasseScolastica(nomeClasse, annoScolastico));
    } catch (error: any) {
      alert(error.message);
    }
  
  }

}
