import { Component, inject, WritableSignal, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../spotify-service';
import { TrackItem } from '../../track-item/track-item';

@Component({
  selector: 'app-album-page',
  imports: [TrackItem, CommonModule, RouterModule],
  templateUrl: './album-page.html',
  styleUrl: './album-page.css',
})
export class AlbumPage implements OnInit {
  private route = inject(ActivatedRoute);
  private spotify = inject(SpotifyService);

  album = signal<any | undefined>(undefined);
  tracks = signal<any[] | undefined>(undefined);
  selectedTrack = signal<any | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.spotify.getAlbum(id).subscribe((a:any) => this.album.set(a));
      this.spotify.getAlbumTracks(id).subscribe((t:any) => this.tracks.set(t.items));
    }
  }

  showTrack(t: any) {
    this.selectedTrack.set(t);
  }

  clearSelected() {
    this.selectedTrack.set(undefined);
  }

  selectedDuration(): string {
    const ms = this.selectedTrack()?.duration_ms;
    if (!ms) return '—';
    return Math.round(ms / 1000).toString();
  }

  artists(): string {
    return (this.album()?.artists?.map((a: any) => a.name) ?? []).join(', ');
  }

}
