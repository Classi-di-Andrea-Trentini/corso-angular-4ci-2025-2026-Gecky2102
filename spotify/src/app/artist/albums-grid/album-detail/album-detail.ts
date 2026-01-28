import { Component, input, Output, EventEmitter, inject, WritableSignal, signal } from '@angular/core';
import { Item } from '../../../interfaces/i-album';
import { SpotifyService } from '../../../spotify-service';
import { TrackItem } from '../../../track-item/track-item';

@Component({
  selector: 'app-album-detail',
  imports: [TrackItem],
  templateUrl: './album-detail.html',
  styleUrl: './album-detail.css',
})
export class AlbumDetail {
  album = input<Item>();
  @Output() close = new EventEmitter<void>();

  private spotify = inject(SpotifyService);
  tracks: WritableSignal<any[] | undefined> = signal(undefined);

  ngOnInit(): void {
    const id = this.album()?.id;
    if (id) {
      this.spotify.getAlbumTracks(id).subscribe((res: any) => {
        this.tracks.set(res.items);
      });
    }
  }

  onClose() {
    this.close.emit();
  }
}
