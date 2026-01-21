import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify-service';
import { OnInit } from '@angular/core';
import { IArtist } from '../interfaces/i-artist';


@Component({
  selector: 'app-artist',
  imports: [],
  templateUrl: './artist.html',
  styleUrl: './artist.css',
})
export class Artist implements OnInit {
  private acttivatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private SpotifyService: SpotifyService = inject(SpotifyService);

  artist: WritableSignal<IArtist | null> = signal(null);
  artistTopTracks: WritableSignal<any[] | null> = signal(null);

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
        console.log(albumsData);
      });
    });
  }
}
