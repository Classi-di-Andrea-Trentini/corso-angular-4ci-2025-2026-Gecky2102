import { Injectable, inject, signal, WritableSignal, DestroyRef, Injector, runInInjectionContext } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, authState, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private destroyRef = inject(DestroyRef);
  private injector = inject(Injector);
  
  user$: Observable<User | null> = authState(this.auth);
  currentUser: WritableSignal<User | null> = signal(null);

  constructor() {
    console.log('AuthService: Inizializzazione');
    console.log('Usando signInWithPopup invece di redirect per compatibilità Codespaces');
    
    // Monitora lo stato dell'utente con takeUntilDestroyed
    this.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        console.log('Auth state changed:', user ? `User ${user.uid} - ${user.email}` : 'No user');
        this.currentUser.set(user);
      });
  }
  
  // Login con Google usando popup
  async loginWithGoogle(): Promise<User> {
    try {
      console.log('Avvio login con Google via popup...');
      
      const provider = new GoogleAuthProvider();
      
      // Configura richieste profilo aggiuntive
      provider.addScope('profile');
      provider.addScope('email');
      
      // IMPORTANTE: Usa popup invece di redirect per Codespaces
      console.log('Chiamata signInWithPopup...');
      const result = await runInInjectionContext(this.injector, async () => {
        return await signInWithPopup(this.auth, provider);
      });
      
      console.log('LOGIN COMPLETATO CON POPUP');
      console.log('User UID:', result.user.uid);
      console.log('Email:', result.user.email);
      console.log('Nome:', result.user.displayName);
      console.log('Foto:', result.user.photoURL);
      
      return result.user;
    } catch (error: any) {
      console.error('Errore durante il login con Google:', error);
      console.error('Codice:', error?.code);
      console.error('Messaggio:', error?.message);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Errore durante il logout:', error);
      throw error;
    }
  }

  // Ottieni l'utente corrente
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Verifica se l'utente è autenticato
  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }
}
