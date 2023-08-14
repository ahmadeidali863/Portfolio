import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',   redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('../app/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'gallery/:id',
    loadComponent: () => import('../app/gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('../app/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'aboutme',
    loadComponent: () => import('../app/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'contact',
   loadComponent: () => import('../app/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'helloWorld',
    loadComponent: () => import('../app/core/component/hello-world/hello-world.component').then(m => m.HelloWorldComponent)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', // or 'top' or 'disabled'
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
