import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify-service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-artist',
  imports: [],
  templateUrl: './artist.html',
  styleUrl: './artist.css',
})
export class Artist implements OnInit {
  private acttivatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private SpotifyService: SpotifyService = inject(SpotifyService);


  ngOnInit(): void {
    this.acttivatedRoute.params.subscribe((params) => {
      let id: string = params['id'];
      console.log(id);
    });
  }
}
