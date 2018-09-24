import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Constants} from './app.constants';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {routes} from './app.routes';
import {Home} from './components/home';
import {Login} from './components/login';
import {CommonSharedModule} from './modules/common.shared.module';
import {
  GenericService, UserService
} from './services/';
import {GlobalEventsManager} from './services/globalEventsManager';

@NgModule({
  declarations: [
    AppComponent, Home, Login
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, HttpModule, CommonSharedModule,
    
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],

  providers: [GenericService, UserService, Constants, GlobalEventsManager
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
