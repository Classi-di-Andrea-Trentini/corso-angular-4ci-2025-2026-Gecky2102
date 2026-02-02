import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc, DocumentReference } from '@angular/fire/firestore';
import { UserProfile } from '../interfaces/user-profile';
import { SpotifyService } from '../spotify-service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private firestore: Firestore = inject(Firestore);
  private injector: Injector = inject(Injector);
  private spotifyService: SpotifyService = inject(SpotifyService);

  // Crea o aggiorna il profilo utente
  async createOrUpdateProfile(uid: string, email: string | null, displayName: string | null, photoURL: string | null, spotifyId?: string): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Crea nuovo profilo
      const newProfile: UserProfile = {
        uid,
        email,
        displayName,
        photoURL,
        spotifyId: spotifyId || null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await setDoc(userDocRef, newProfile);
    } else {
      // Aggiorna profilo esistente
      await updateDoc(userDocRef, {
        email,
        displayName,
        photoURL,
        updatedAt: new Date(),
        ...(spotifyId && { spotifyId })
      });
    }
    });
  }

  // Ottieni il profilo utente
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    return runInInjectionContext(this.injector, async () => {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    });
  }

  // Aggiorna solo l'ID Spotify e lo stato Premium
  async updateSpotifyId(uid: string, spotifyId: string, isPremium: boolean = false): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      try {
        console.log('Chiamata API Spotify per user:', spotifyId);
        // Recupera i dati del profilo Spotify
        const spotifyProfile = await firstValueFrom(this.spotifyService.getUserProfile(spotifyId));
        console.log('Risposta API Spotify:', spotifyProfile);
        console.log('Display name:', spotifyProfile.display_name);
        console.log('Photo URL:', spotifyProfile.images?.[0]?.url);
        console.log('Product:', spotifyProfile.product);
        
        const userDocRef = doc(this.firestore, `users/${uid}`);
        await updateDoc(userDocRef, {
          spotifyId,
          spotifyDisplayName: spotifyProfile.display_name || null,
          spotifyPhotoURL: spotifyProfile.images?.[0]?.url || null,
          isPremium: spotifyProfile.product === 'premium' || isPremium,
          updatedAt: new Date()
        });
        console.log('Profilo aggiornato con successo nel database');
      } catch (error) {
        console.error('Errore recupero profilo Spotify:', error);
        // Se fallisce, salva comunque l'ID senza i dati aggiuntivi
        const userDocRef = doc(this.firestore, `users/${uid}`);
        await updateDoc(userDocRef, {
          spotifyId,
          isPremium,
          updatedAt: new Date()
        });
      }
    });
  }

  // Estrai l'ID Spotify da un URL
  extractSpotifyIdFromUrl(url: string): string | null {
    // Supporta: https://open.spotify.com/user/31garwjianwaylkm2mf2n4frcvja
    const match = url.match(/spotify\.com\/user\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  }

  // Valida l'ID Spotify
  isValidSpotifyId(spotifyId: string): boolean {
    // Un ID Spotify è alfanumerico e lungo almeno 5 caratteri
    return /^[a-zA-Z0-9]{5,}$/.test(spotifyId);
  }
}
