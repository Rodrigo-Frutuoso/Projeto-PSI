import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ProfileComponent } from './components/profile/profile';
import { EditProfileComponent } from './components/edit-profile/edit-profile';
import { authGuard } from './guards/auth.guard';
import { SearchComponent } from './components/search/search';
import { ArtistComponent } from './components/artist/artist';
import { ArtistAlbumsComponent } from './components/artist-albums/artist-albums';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'profile/edit', component: EditProfileComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  { path: 'artist/:id', component: ArtistComponent, canActivate: [authGuard] },
  { path: 'artist/:id/albums', component: ArtistAlbumsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' },


];