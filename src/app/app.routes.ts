import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'events',
    loadComponent: () =>
      import('../app/features/event-list/event-list/event-list.component').then(
        (m) => m.EventListComponent
      ),
  },
];
