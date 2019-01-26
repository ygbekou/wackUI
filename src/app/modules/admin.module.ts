import { TokenInterceptor } from '../app.interceptor';
import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {CommonSharedModule} from './common.shared.module';


import { SearchComponent } from '../components/includes/search';
import { TokenStorage, LoggedInGuard } from '../services';

const routes: Routes = [
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    RouterModule.forChild(routes), CommonSharedModule,
    TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }
    )
  ],

  exports: [CommonSharedModule, TranslateModule],

  declarations: [SearchComponent],

  providers: [TokenStorage, LoggedInGuard]
})

export class AdminModule {}
