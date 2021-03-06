import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import { Login} from './components/login';
import { Services} from './components/services';
import { Landing} from './components/website/landing';
import { LoggedInGuard } from './services/loggedIn.guard';
import { AdminWebsite } from './components/website/adminWebsite';
import { Industries } from './components/industries';
import { AboutUs } from './components/aboutUs';
import { Testimonials } from './components/testimonials';
import { Contact } from './components/contact';
import { SingleSection } from './components/singleSection';


export const routes: Routes = [
  {path: '', component: Landing, pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'section', component: SingleSection},
  {path: 'services', component: Services},
  {path: 'industries', component: Industries},
  {path: 'about', component: AboutUs},
  {path: 'testimonials', component: Testimonials},
  {path: 'contact', component: Contact},
  {path: 'adminWebsite', component: AdminWebsite},
  {path: 'admin', loadChildren: './modules/admin.module#AdminModule', canActivate: [LoggedInGuard], }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
