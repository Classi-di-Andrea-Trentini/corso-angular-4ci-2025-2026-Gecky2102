import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  authService: AuthService = inject(AuthService);
  private userProfileService: UserProfileService = inject(UserProfileService);
  private router: Router = inject(Router);

  spotifyInput: WritableSignal<string> = signal('');
  isPremium: WritableSignal<boolean> = signal(false);
  showSpotifyForm: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  private hasProcessedUser = false;

  ngOnInit(): void {
    console.log('Login Component: ngOnInit');
    
    this.authService.user$.subscribe(async (user) => {
      console.log('Login: Auth state changed, user:', user ? `${user.email} (${user.uid})` : 'null');
      
      if (user && !this.hasProcessedUser && !this.showSpotifyForm()) {
        console.log('Utente rilevato, inizio elaborazione...');
        this.hasProcessedUser = true;
        await this.handleAuthenticatedUser(user);
      } else if (!user) {
        this.hasProcessedUser = false;
      }
    });
  }
  
  private async handleAuthenticatedUser(user: User): Promise<void> {
    try {
      console.log('Gestione utente autenticato:', user.uid);
      this.isLoading.set(true);
      
      const profile = await this.userProfileService.getUserProfile(user.uid);
      
      if (profile && profile.spotifyId) {
        console.log('Utente con Spotify ID, redirect a home');
        await this.router.navigate(['/home']);
      } else {
        console.log('Nuovo utente o senza Spotify ID, mostra form');
        
        if (!profile) {
          await this.userProfileService.createOrUpdateProfile(
            user.uid,
            user.email,
            user.displayName,
            user.photoURL
          );
        }
        
        this.showSpotifyForm.set(true);
        this.isLoading.set(false);
      }
    } catch (error) {
      console.error('Errore durante la gestione utente autenticato:', error);
      this.errorMessage.set('Errore durante il caricamento del profilo. Riprova.');
      this.isLoading.set(false);
      this.hasProcessedUser = false;
    }
  }

  async saveSpotifyId(): Promise<void> {
    const input = this.spotifyInput().trim();
    
    if (!input) {
      this.errorMessage.set('Inserisci un ID o URL Spotify valido');
      return;
    }

    const user = this.authService.currentUser();
    if (!user) {
      this.errorMessage.set('Nessun utente loggato');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const spotifyId = this.extractSpotifyId(input);
      console.log('ID Spotify estratto:', spotifyId);
      
      await this.userProfileService.updateSpotifyId(user.uid, spotifyId, this.isPremium());
      console.log('ID Spotify salvato con successo');
      
      // Aspetta un momento per permettere al menu di aggiornarsi
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Errore nel salvataggio ID Spotify:', error);
      this.errorMessage.set('Errore durante il salvataggio: ' + error.message);
    } finally {
      this.isLoading.set(false);
    }
  }

  private extractSpotifyId(input: string): string {
    if (input.includes('open.spotify.com/user/')) {
      const match = input.match(/user\/([^?/]+)/);
      if (match && match[1]) {
        return match[1];
      }
    }
    return input;
  }

  async loginWithGoogle(): Promise<void> {
    console.log('Click su "Accedi con Google"');
    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      console.log('Chiamata authService.loginWithGoogle()...');
      const user = await this.authService.loginWithGoogle();
      console.log('Login completato, user:', user.email);
    } catch (error: any) {
      console.error('Errore nel login:', error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        this.errorMessage.set('Login annullato. Riprova.');
      } else if (error.code === 'auth/popup-blocked') {
        this.errorMessage.set('Popup bloccato dal browser. Abilita i popup per questo sito.');
      } else {
        this.errorMessage.set('Errore durante il login: ' + error.message);
      }
      
      this.isLoading.set(false);
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.showSpotifyForm.set(false);
    this.spotifyInput.set('');
    this.isPremium.set(false);
    this.errorMessage.set('');
    this.hasProcessedUser = false;
  }
}
