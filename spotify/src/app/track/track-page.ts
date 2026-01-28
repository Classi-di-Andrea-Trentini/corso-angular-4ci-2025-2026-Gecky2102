import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SpotifyService } from '../spotify-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './track-page.html',
  styleUrl: './track-page.css',
})
export class TrackPage implements OnInit {
  private route = inject(ActivatedRoute);
  private spotify = inject(SpotifyService);

  track = signal<any | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.spotify.getTrack(id).subscribe((t:any) => this.track.set(t));
    }
  }

  artists(): string {
    return (this.track()?.artists?.map((a: any) => a.name) ?? []).join(', ');
  }

  durationSeconds(): string {
    const ms = this.track()?.duration_ms;
    if (!ms) return '—';
    return Math.round(ms / 1000).toString();
  }

  featList(): string {
    return (this.track()?.artists?.slice(1).map((a: any) => a.name) ?? []).join(', ');
  }
}
