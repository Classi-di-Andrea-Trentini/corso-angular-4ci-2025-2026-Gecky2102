import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfile } from '../interfaces/user-profile';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  authService = inject(AuthService);
  private userProfileService = inject(UserProfileService);
  
  userProfile: WritableSignal<UserProfile | null> = signal(null);
  isLoading: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (user) {
      this.loadProfile(user.uid);
    }
  }

  async loadProfile(uid: string): Promise<void> {
    try {
      const profile = await this.userProfileService.getUserProfile(uid);
      this.userProfile.set(profile);
    } catch (error) {
      console.error('Errore caricamento profilo:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}

