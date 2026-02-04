import { Component, input, Output, EventEmitter, inject } from '@angular/core';
import { Item } from '../../../interfaces/i-album';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums-card',
  imports: [],
  templateUrl: './albums-card.html',
  styleUrl: './albums-card.css',
})
export class AlbumsCard {
  album = input<Item>();
  private router = inject(Router);

  onSelect() {
    const id = this.album()?.id;
    if (id) this.router.navigate(['/album', id]);
  }
}
