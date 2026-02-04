import { Component, input, signal, WritableSignal } from '@angular/core';
import { Item } from '../../interfaces/i-album';
import { AlbumsCard } from './albums-card/albums-card';

@Component({
  selector: 'app-albums-grid',
  imports: [AlbumsCard],
  templateUrl: './albums-grid.html',
  styleUrl: './albums-grid.css',
})
export class AlbumsGrid {
  albums = input<Item[]>();

  singles(): Item[] | undefined {
    const list = this.albums();
    if (!list) return undefined;
    return list
      .filter(a => a.album_type === 'single')
      .slice()
      .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
  }

  albumsOnly(): Item[] | undefined {
    const list = this.albums();
    if (!list) return undefined;
    return list
      .filter(a => a.album_type === 'album')
      .slice()
      .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
  }


}
