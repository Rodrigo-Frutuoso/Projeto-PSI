import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ProfileComponent } from './components/profile/profile';
import { EditProfileComponent } from './components/edit-profile/edit-profile';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { SearchComponent } from './components/search/search';
import { ArtistComponent } from './components/artist/artist';
import { ArtistAlbumsComponent } from './components/artist-albums/artist-albums';
import { CollectionComponent } from './components/collection/collection';
import { AlbumComponent } from './components/album/album';
import { VersionRequestsComponent } from './components/version-requests/version-requests';
import { CustomListsComponent } from './components/custom-lists/custom-lists';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'profile/edit', component: EditProfileComponent, canActivate: [authGuard] },
  { path: 'collection', component: CollectionComponent, canActivate: [authGuard] },
  { path: 'requests', component: VersionRequestsComponent, canActivate: [authGuard] },
  { path: 'custom-lists', component: CustomListsComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  { path: 'artist/:id', component: ArtistComponent, canActivate: [authGuard] },
  { path: 'artist/:id/albums', component: ArtistAlbumsComponent, canActivate: [authGuard] },
  { path: 'album/:id', component: AlbumComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' },
];