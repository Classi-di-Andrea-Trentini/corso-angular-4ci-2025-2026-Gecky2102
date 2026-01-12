import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, WritableSignal } from '@angular/core';
import { IToken } from './interfaces/i-token';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  // Dependancy Injection: l'attributo httpClient viene inizializzato con l'istanza della classe HttpClient creat all'avvio dell'applicazione dopo che nel file app.config.ts  abbiamo aggiunto il provider provideHttpClient()
  httpClient: HttpClient = inject(HttpClient);


  private clientId: string = 'c07c32d838864ab8bc6206f905f399dd';
  private clientSecret: string = '45011bf050e54b4ea73cd0e92ca33b4f';
  private urls: string[] = [
    'https://accounts.spotify.com/api/token'
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
    });  
    

  }





}
