import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/slots', pathMatch: 'full'},
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: '**', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}