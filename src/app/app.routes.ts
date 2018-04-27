import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Home} from './components/home';
import {Login} from './components/login';
export const routes: Routes = [
  {path: 'home', component: Home},
  {path: 'login', component: Login},
  {path: 'admin', loadChildren: './modules/admin.module#AdminModule'},
  {path: '', component: Home, pathMatch: 'full'}
];
