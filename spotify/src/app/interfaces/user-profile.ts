export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  spotifyId: string | null;
  spotifyDisplayName?: string | null; // Nome visualizzato su Spotify
  spotifyPhotoURL?: string | null; // Foto profilo di Spotify
  isPremium?: boolean; // Flag per indicare se l'utente ha Spotify Premium
  createdAt: Date;
  updatedAt: Date;
}
