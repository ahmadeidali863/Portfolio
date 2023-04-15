import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('../app/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'aboutme',
    loadComponent: () => import('../app/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'contact',
   loadComponent: () => import('../app/home/home.component').then(m => m.HomeComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
