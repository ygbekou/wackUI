import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routes';
import { HttpModule} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CurrencyMaskModule } from 'ng2-currency-mask';
 
import { AccordionModule } from 'primeng/accordion'; 
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

import { AppComponent } from './app.component';
import { AppRightPanelComponent } from './app.rightpanel.component';
import { AppProfileComponent } from './app.profile.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppMegamenuComponent } from './app.megamenu.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { BreadcrumbService } from './breadcrumb.service';
import {Constants} from './app.constants';
import { TokenInterceptor } from './app.interceptor';
import {Routes, RouterModule} from '@angular/router';
import {routes} from './app.routes';
import {Login} from './components/login';
import {Landing} from './components/website/landing';
import {Industries} from './components/industries';
import {Services} from './components/services';
import {AboutUs} from './components/aboutUs';
import {Contact} from './components/contact';
import {SingleSection} from './components/singleSection';

import {Header} from './components/website/header';
import {Footer} from './components/website/footer';
import {CommonSharedModule} from './modules/common.shared.module';
import {
  GenericService, UserService, TokenStorage, AuthenticationService, LoggedInGuard} from './services/';
import { GlobalEventsManager } from './services/globalEventsManager';
import { AdminWebsite } from './components/website/adminWebsite';
import { AdminHeader } from './components/website/adminHeader';
import { SectionDetails } from './components/website/sectionDetails';
import { SectionList } from './components/website/sectionList';
import { TestimonyDetails } from './components/testimonyDetails';
import { TestimonyList } from './components/testimonyList';
import { SectionItemDetails } from './components/website/sectionItemDetails';
import { SectionItemList } from './components/website/sectionItemList';
import { SliderDetails } from './components/website/sliderDetails';
import { SliderList } from './components/website/sliderList';
import { FundDetails } from './components/stock/fundDetails';
import { FundList } from './components/stock/fundList';
import { SliderTextDetails } from './components/website/sliderTextDetails';
import { SliderTextList } from './components/website/sliderTextList';
import { CompanyDetails } from './components/companyDetails';
import { CompanyList } from './components/companyList';
import { EmployeeDetails } from './components/employeeDetails';
import { EmployeeList } from './components/employeeList';
import { ContactDetails } from './components/contactDetails';
import { ContactList } from './components/contactList';
import { ReferenceDetails } from './components/common/referenceDetails';
import { ReferenceList } from './components/common/referenceList';
import { PaymentDetails } from './components/stock/paymentDetails';
import { PaymentList } from './components/stock/paymentList';
import { GlobalErrorHandler } from './services/globalErrorHandler';

import { ConfirmationService } from 'primeng/api';
import { EmployeeDropdown } from './components/dropdowns/dropdown.employee';
import { PaymentTypeDropdown } from './components/dropdowns/dropdown.paymentType';
import { SupplierDetails } from './components/stock/supplierDetails';
import { SupplierList } from './components/stock/supplierList';
import { PurchaseDetails } from './components/stock/purchaseDetails';
import { PurchaseList } from './components/stock/purchaseList';
import { SupplierDropdown } from './components/dropdowns/dropdown.supplier';
import { ProductDropdown } from './components/dropdowns/dropdown.product';
import { ContractLaborDetails } from './components/stock/contractLaborDetails';
import { ContractLaborList } from './components/stock/contractLaborList';
import { ContractLaborDropdown } from './components/dropdowns/dropdown.contractLabor';
import { QuoteDetails } from './components/stock/quoteDetails';
import { QuoteList } from './components/stock/quoteList';
import { ManagerDropdown } from './components/dropdowns/dropdown.manager';
import { MonthDropdown } from './components/dropdowns/dropdown.month';
import { YearDropdown } from './components/dropdowns/dropdown.year';
import { QuoteDropdown } from './components/dropdowns/dropdown.quote';
import { FundExpenseStatistics } from './components/stock/fundExpenseStatistics';
import { Testimonials } from './components/testimonials';
import { CompanyHistoryDetails } from './components/website/companyHistoryDetails';
import { CompanyHistoryList } from './components/website/companyHistoryList';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutes,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    ScrollPanelModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    CurrencyMaskModule
  ],
  declarations: [
    AppComponent,
    AppRightPanelComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppMegamenuComponent,
    AppBreadcrumbComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppProfileComponent,
    Login,
    Services,
    Industries,
    SingleSection,
    AboutUs,
    Contact,
    Landing,
    Header,
    Footer,
    AdminWebsite,
    AdminHeader,
    SectionDetails,
    SectionList,
    CompanyHistoryDetails,
    CompanyHistoryList,
    TestimonyDetails,
    TestimonyList,
    SectionItemDetails,
    SectionItemList,
    SliderDetails,
    SliderList,
    FundDetails,
    FundList,
    SliderTextDetails,
    SliderTextList,
    CompanyDetails,
    CompanyList,
    ContactDetails,
    ContactList,
    EmployeeDetails,
    EmployeeList,
    ReferenceDetails,
    ReferenceList,
    PaymentDetails,
    PaymentList,
    SupplierDetails,
    SupplierList,
    PurchaseDetails,
    PurchaseList,
    ContractLaborDetails,
    ContractLaborList,
    QuoteDetails,
    QuoteList,
    FundExpenseStatistics,
    Testimonials

  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
     BreadcrumbService, GenericService, UserService, Constants, GlobalEventsManager, TokenStorage, AuthenticationService, 
     LoggedInGuard, ConfirmationService, EmployeeDropdown, PaymentTypeDropdown, SupplierDropdown, ProductDropdown, ManagerDropdown,
     ContractLaborDropdown, MonthDropdown, YearDropdown, QuoteDropdown
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
