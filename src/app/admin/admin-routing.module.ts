import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';

const routes: Routes = [
  {
    path: '',
    // data: {
    //   role: [Roles.User]
    // },
    // canActivate: [
    //   () => inject(MobileGuard).canActivate,
    //   () => inject(AuthGuard).canActivate
    //   ],
    component: AdminComponent,
 children: [
   {
    path: 'categories',
    title:'Categories',
    loadComponent: () => import('../admin/admin-categories/admin-categories.component').then(m => m.AdminCategoriesComponent)
    },
   {
    path: 'profile',
    title:'Profile',
    loadComponent: () => import('../admin/admin-profile/admin-profile.component').then(m => m.AdminProfileComponent)
    },
   {
    path: 'categoryImages',
    title:'categoryImages',
    loadComponent: () => import('../admin/admin-categories-images/admin-categories-images.component').then(m => m.AdminCategoriesImagesComponent)
    },
   {
    path: 'security',
    title:'Security',
    loadComponent: () => import('../admin/admin-security/admin-security.component').then(m => m.AdminSecurityComponent)
   }]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
