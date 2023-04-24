import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('../app/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'gallery',
    loadComponent: () => import('../app/gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'aboutme',
    loadComponent: () => import('../app/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('../app/admin/admin.component').then(m => m.AdminComponent)
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
