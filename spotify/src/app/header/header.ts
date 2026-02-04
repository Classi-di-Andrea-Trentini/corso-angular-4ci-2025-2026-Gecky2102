import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfile } from '../interfaces/user-profile';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  authService: AuthService = inject(AuthService);
  private userProfileService: UserProfileService = inject(UserProfileService);
  private router: Router = inject(Router);
  
  userProfile: WritableSignal<UserProfile | null> = signal(null);

  ngOnInit(): void {
    // Monitora lo stato dell'utente e carica il profilo
    this.authService.user$.subscribe(async (user) => {
      if (user) {
        const profile = await this.userProfileService.getUserProfile(user.uid);
        this.userProfile.set(profile);
      } else {
        this.userProfile.set(null);
      }
    });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
