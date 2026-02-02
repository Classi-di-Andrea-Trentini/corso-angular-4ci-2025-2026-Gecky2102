import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, WritableSignal } from '@angular/core';
import { IToken } from './interfaces/i-token';
import { interval, Observable } from 'rxjs';
import { SearchArtist } from './search-artist/search-artist';
import { isReactive } from '@angular/core/primitives/signals';
import { ISearchArtist } from './interfaces/i-artist-search';
import { IArtist } from './interfaces/i-artist';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  // Dependancy Injection: l'attributo httpClient viene inizializzato con l'istanza della classe HttpClient creat all'avvio dell'applicazione dopo che nel file app.config.ts  abbiamo aggiunto il provider provideHttpClient()
  private httpClient: HttpClient = inject(HttpClient);


  private clientId: string = 'c07c32d838864ab8bc6206f905f399dd';
  private clientSecret: string = '45011bf050e54b4ea73cd0e92ca33b4f';
  private urls: string[] = [
    'https://accounts.spotify.com/api/token',
    'https://api.spotify.com/v1/search?q=',
    'https://api.spotify.com/v1/artists/',
  ];
  private _token!: IToken;

  public getToken(): void {
    //prepariamo l'header per la richiesta di token
    let httpHeader: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    // preparo il body
    let httpParams = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    this.httpClient.post<IToken>(this.urls[0], httpParams.toString(), { headers: httpHeader })
      .subscribe((token: IToken) => {
        this._token = token;
        console.log(this._token);
        interval(this._token.expires_in * 1000).subscribe(() => {
          this.httpClient.post<IToken>(this.urls[0], httpParams.toString(), { headers: httpHeader })
            .subscribe((token: IToken) => {
              this._token = token;
            })
        })
      })
  }

  searchArtist(name: string): Observable<ISearchArtist> {
    let url = `${this.urls[1]}${name}&type=artist&limit=10`;
    let httpHeader = new HttpHeaders()
      .set('Authorization', this._token.token_type + ' ' + this._token.access_token);

    return this.httpClient.get<ISearchArtist>(url, { headers: httpHeader });

  }

  getArtist(id: string): Observable<IArtist> {
    let url = `${this.urls[2]}/${id}`;
    let httpHeader = new HttpHeaders()
      .set('Authorization', this._token.token_type + ' ' + this._token.access_token);

    return this.httpClient.get<IArtist>(url, { headers: httpHeader });
  }
  getArtistTopTracks(id: string): Observable<any> {
    let url = `${this.urls[2]}/${id}/top-tracks?market=IT`;
    let httpHeader = new HttpHeaders()
      .set('Authorization', this._token.token_type + ' ' + this._token.access_token);
    return this.httpClient.get<any>(url, { headers: httpHeader });
  }
  getArtistAlbums(id: string): Observable<any> {
    let url = `${this.urls[2]}/${id}/albums?market=IT`;
    let httpHeader = new HttpHeaders()
      .set('Authorization', this._token.token_type + ' ' + this._token.access_token);
    return this.httpClient.get<any>(url, { headers: httpHeader });
  }

  getAlbumTracks(albumId: string): Observable<any> {
    let url = `https://api.spotify.com/v1/albums/${albumId}/tracks?market=IT`;
    let httpHeader = new HttpHeaders()
      .set('Authorization', this._token.token_type + ' ' + this._token.access_token);
    return this.httpClient.get<any>(url, { headers: httpHeader });
  }

  getAlbum(albumId: string): Observable<any> {
    let url = `https://api.spotify.com/v1/albums/${albumId}`;
    let httpHeader = new HttpHeaders()
      .set('Authorization', this._token.token_type + ' ' + this._token.access_token);
    return this.httpClient.get<any>(url, { headers: httpHeader });
  }

  getTrack(trackId: string): Observable<any> {
    let url = `https://api.spotify.com/v1/tracks/${trackId}`;
    let httpHeader = new HttpHeaders()
      .set('Authorization', this._token.token_type + ' ' + this._token.access_token);
    return this.httpClient.get<any>(url, { headers: httpHeader });
  }

  getUserProfile(userId: string): Observable<any> {
    if (!this._token) {
      throw new Error('Token Spotify non disponibile. Attendi che l\'app si inizializzi.');
    }
    let url = `https://api.spotify.com/v1/users/${userId}`;
    let httpHeader = new HttpHeaders()
      .set('Authorization', this._token.token_type + ' ' + this._token.access_token);
    console.log('Chiamata API Spotify con token:', this._token.access_token.substring(0, 20) + '...');
    return this.httpClient.get<any>(url, { headers: httpHeader });
  }
}