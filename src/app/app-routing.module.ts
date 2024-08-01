import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/slots', pathMatch: 'full'},
  { path: 'main', loadComponent: () => import('./features/main/main.component').then(m => m.MainComponent) },
  { path: 'live', loadComponent: () => import('./features/live/live.component').then(m => m.LiveComponent) },
  { path: 'casino', loadComponent: () => import('./features/casino/casino.component').then(m => m.CasinoComponent) },
  { path: 'sports', loadComponent: () => import('./features/sports/sports.component').then(m => m.SportsComponent) },
  { path: '**', loadComponent: () => import('./features/main/main.component').then(m => m.MainComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}