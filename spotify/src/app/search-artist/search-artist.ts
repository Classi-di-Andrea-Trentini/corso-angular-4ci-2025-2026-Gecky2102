import { Component, WritableSignal, signal } from '@angular/core';
import { SpotifyService } from '../spotify-service';
import { inject } from '@angular/core';
import { ISearchArtist, Item } from '../interfaces/i-artist-search';
import { RouterTestingHarness } from '@angular/router/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, EMPTY } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-artist',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './search-artist.html',
  styleUrl: './search-artist.css',
})
export class SearchArtist implements OnInit {

  artisti: WritableSignal<Item[]> = signal([]);
  spotifyService: SpotifyService = inject(SpotifyService);

  // Questo oggetto mi consente di gestire lato TypeScript quanto succeede in un tag input HTML. 
  // Questo oggetto necessita di un collegamento nel template HTML tramite la direttiva [formControl]="inputName"
  inputName: FormControl<string> = new FormControl('', { nonNullable: true });

  search(name: string): void {
    this.spotifyService.searchArtist(name).subscribe((data) => {
      console.log(data);
      this.artisti.set(data.artists.items);
    });
  }

  ngOnInit(): void {
    this.inputName.valueChanges.pipe(
      // ignoriamo le richieste se l'utente sta scrivendo velocemente e quelle duplicate consecutive
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((name: string) => {
        if (name.length === 0) {
          this.artisti.set([]);
          return EMPTY;
        }
        return this.spotifyService.searchArtist(name);
      })
    ).subscribe((data: ISearchArtist | null) => {
      console.log(data);
      this.artisti.set(data?.artists?.items? data.artists.items : []);
    });
  }

}
