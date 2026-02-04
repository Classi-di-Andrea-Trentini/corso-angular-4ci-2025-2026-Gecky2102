import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SearchArtist } from './search-artist/search-artist';
import { NotFound } from './not-found/not-found';
import { Artist } from './artist/artist';
import { Login } from './login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: Login},
    {path: "home", component: Home, canActivate: [authGuard]},
    {path: "search-artist", component: SearchArtist, canActivate: [authGuard]},
    {path: "artist/:id", component: Artist, canActivate: [authGuard]},
    {path: "album/:id", loadComponent: () => import('./artist/album-page/album-page').then(m => m.AlbumPage), canActivate: [authGuard]},
    {path: "track/:id", loadComponent: () => import('./track/track-page').then(m => m.TrackPage), canActivate: [authGuard]},
    {path: "**", component: NotFound}
];
