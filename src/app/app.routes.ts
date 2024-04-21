import { Routes } from '@angular/router';

import { HomeComponent } from '@modules/home/home.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'artwork-details/:id',
    loadComponent: () =>
      import('./modules/artwork-details/artwork-details.component').then(
        (mod) => mod.ArtworkDetailsComponent
      ),
  },
];
