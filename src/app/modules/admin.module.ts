import { TokenInterceptor } from '../app.interceptor';
import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';

import { CommonSharedModule } from './common.shared.module';
import { BaseComponent } from '../components/website/baseComponent';

import { SearchComponent } from '../components/includes/search';
import { TokenStorage, LoggedInGuard } from '../services';
import { EmployeeDropdown } from '../components/dropdowns/dropdown.employee';
import { PaymentTypeDropdown } from '../components/dropdowns/dropdown.paymentType';

const routes: Routes = [
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    RouterModule.forChild(routes), CommonSharedModule, CurrencyMaskModule,
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

  declarations: [SearchComponent, BaseComponent],

  providers: [TokenStorage, LoggedInGuard, EmployeeDropdown, PaymentTypeDropdown]
})

export class AdminModule {}
