import { Component, input } from '@angular/core';
import { Item } from '../../../interfaces/i-album';

@Component({
  selector: 'app-albums-card',
  imports: [],
  templateUrl: './albums-card.html',
  styleUrl: './albums-card.css',
})
export class AlbumsCard {
  album = input<Item>();
}
