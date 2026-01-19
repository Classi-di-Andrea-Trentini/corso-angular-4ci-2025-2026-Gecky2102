import { Component, WritableSignal, signal } from '@angular/core';
import { SpotifyService } from '../spotify-service';
import { inject } from '@angular/core';
import { Item } from '../interfaces/i-artist-search';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({
  selector: 'app-search-artist',
  imports: [],
  templateUrl: './search-artist.html',
  styleUrl: './search-artist.css',
})
export class SearchArtist {

  artisti: WritableSignal<Item[]> = signal([]);
  spotifyService: SpotifyService = inject(SpotifyService);

  search(name: string): void {
    this.spotifyService.searchArtist(name).subscribe((data) => {
      console.log(data);
      this.artisti.set(data.artists.items);
    });
  }
}
