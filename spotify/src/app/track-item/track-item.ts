import { Component, input, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-item',
  imports: [CommonModule],
  templateUrl: './track-item.html',
  styleUrl: './track-item.css',
})
export class TrackItem {
  track = input<any>();
  albumImage = input<string | undefined>();
  mode: 'navigate' | 'emit' = 'navigate';
  @Output() select = new EventEmitter<any>();
  private router = inject(Router);

  handleClick() {
    const albumId = this.track()?.album?.id;
    if (this.mode === 'emit') {
      this.select.emit(this.track());
    } else {
      // Navigate to album page instead of individual track page
      if (albumId) this.router.navigate(['/album', albumId]);
    }
  }

  artists(): string {
    return (this.track()?.artists?.map((a: any) => a.name) ?? []).join(', ');
  }

  private hashId(): number {
    const id = this.track()?.id ?? '';
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h << 5) - h + id.charCodeAt(i);
    return Math.abs(h);
  }

  private getStreamEstimate(): number | undefined {
    const t = this.track();
    if (!t) return undefined;
    if (t.streams !== undefined) return t.streams;
    if (t.popularity !== undefined) {
      const base = Math.round(t.popularity * 1000000);
      const noise = this.hashId() % 100000; // deterministic small variation
      return base + noise;
    }
    return undefined;
  }

  formatStreams(): string | undefined {
    const s = this.getStreamEstimate();
    if (s === undefined) return undefined;
    return new Intl.NumberFormat('it-IT').format(s);
  }
}