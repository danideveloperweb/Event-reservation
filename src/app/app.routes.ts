import { Routes } from '@angular/router';
import { detailGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'events',
    loadComponent: () =>
      import('../app/features/event-list/event-list/event-list.component')
        .then(m => m.EventListComponent)
  },
  {
    path: 'events/:id',
    canActivate: [detailGuard],
    loadComponent: () =>
      import('../app/features/event-detail/event-detail/event-detail.component')
        .then(m => m.EventDetailComponent)
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('../app/shared/pages/not-found/not-found.component')
        .then(m => m.NotFoundComponent)
  },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }
];
