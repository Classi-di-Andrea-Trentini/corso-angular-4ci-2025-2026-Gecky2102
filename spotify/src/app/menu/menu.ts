import { Component, inject, signal, WritableSignal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfile } from '../interfaces/user-profile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit, OnDestroy {
  authService = inject(AuthService);
  private userProfileService = inject(UserProfileService);
  
  userProfile: WritableSignal<UserProfile | null> = signal(null);
  private reloadInterval: any;
  
  ngOnInit(): void {
    // Monitora l'utente autenticato e carica il profilo
    this.authService.user$.subscribe(async (user) => {
      if (user) {
        try {
          console.log('Menu: Caricamento profilo per user', user.uid);
          await this.loadProfile(user.uid);
          
          // Avvia polling se mancano i dati Spotify
          this.startPollingIfNeeded(user.uid);
        } catch (error) {
          console.error('Errore caricamento profilo nel menu:', error);
        }
      } else {
        this.userProfile.set(null);
        this.stopPolling();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  private async loadProfile(uid: string): Promise<void> {
    const profile = await this.userProfileService.getUserProfile(uid);
    console.log('Menu: Profilo caricato:', profile);
    console.log('Menu: spotifyDisplayName =', profile?.spotifyDisplayName);
    console.log('Menu: spotifyPhotoURL =', profile?.spotifyPhotoURL);
    console.log('Menu: displayName (Google) =', profile?.displayName);
    console.log('Menu: isPremium =', profile?.isPremium, '(type:', typeof profile?.isPremium, ')');
    this.userProfile.set(profile);
  }

  private startPollingIfNeeded(uid: string): void {
    // Se mancano i dati Spotify ma c'è l'ID, prova a recuperarli dall'API
    const profile = this.userProfile();
    if (profile?.spotifyId && !profile?.spotifyDisplayName && !this.reloadInterval) {
      console.log('Menu: Rilevato spotifyId senza dati, recupero dall\'API Spotify...');
      
      // Prima prova a recuperare subito
      this.fetchSpotifyDataIfMissing(uid, profile.spotifyId, profile.isPremium || false);
      
      // Poi continua con il polling
      let attempts = 0;
      this.reloadInterval = setInterval(async () => {
        attempts++;
        console.log(`Menu: Tentativo ${attempts}/3 di ricaricare profilo`);
        await this.loadProfile(uid);
        
        if (this.userProfile()?.spotifyDisplayName || attempts >= 3) {
          console.log('Menu: Stop polling');
          this.stopPolling();
        }
      }, 2000);
    }
  }

  private async fetchSpotifyDataIfMissing(uid: string, spotifyId: string, isPremium: boolean): Promise<void> {
    try {
      console.log('Menu: Chiamata updateSpotifyId per recuperare dati mancanti...');
      await this.userProfileService.updateSpotifyId(uid, spotifyId, isPremium);
      console.log('Menu: Dati Spotify aggiornati, ricarico profilo...');
      await this.loadProfile(uid);
    } catch (error) {
      console.error('Menu: Errore recupero dati Spotify:', error);
    }
  }

  private stopPolling(): void {
    if (this.reloadInterval) {
      clearInterval(this.reloadInterval);
      this.reloadInterval = null;
    }
  }

  async refreshSpotifyData(): Promise<void> {
    const user = this.authService.currentUser();
    const profile = this.userProfile();
    
    if (!user || !profile?.spotifyId) {
      console.error('Nessun utente o Spotify ID disponibile');
      return;
    }

    console.log('Refresh manuale dei dati Spotify per ID:', profile.spotifyId);
    try {
      await this.userProfileService.updateSpotifyId(user.uid, profile.spotifyId, profile.isPremium || false);
      console.log('Dati Spotify aggiornati, ricarico profilo...');
      await this.loadProfile(user.uid);
    } catch (error) {
      console.error('Errore refresh dati Spotify:', error);
    }
  }

  async logout(event: Event): Promise<void> {
    event.preventDefault();
    await this.authService.logout();
  }
}
