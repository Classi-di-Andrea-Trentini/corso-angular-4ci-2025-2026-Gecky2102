import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify-service';
import { OnInit } from '@angular/core';
import { IArtist } from '../interfaces/i-artist';
import { AlbumsGrid } from './albums-grid/albums-grid';
import { Item } from '../interfaces/i-album';import { TrackItem } from '../track-item/track-item';

@Component({
  selector: 'app-artist',
  imports: [AlbumsGrid, TrackItem],
  templateUrl: './artist.html',
  styleUrl: './artist.css',
})
export class Artist implements OnInit {
  private acttivatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private SpotifyService: SpotifyService = inject(SpotifyService);

  artist: WritableSignal<IArtist | null> = signal(null);
  artistTopTracks: WritableSignal<any[] | null> = signal(null);
  albums: WritableSignal<Item[] | undefined> = signal(undefined);

  ngOnInit(): void {
    this.acttivatedRoute.params.subscribe((params) => {
      let id: string = params['id'];
      console.log(id);
      this.SpotifyService.getArtist(id).subscribe((artistData: IArtist) => {
        this.artist.set(artistData);
      });
      this.SpotifyService.getArtistTopTracks(id).subscribe((topTracksData: any) => {
        this.artistTopTracks.set(topTracksData.tracks);
      });
      this.SpotifyService.getArtistAlbums(id).subscribe((albumsData: any) => {
        this.albums.set(albumsData.items ?? undefined);
      });
    });
  }
}
