import { Component, OnInit, OnDestroy, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Constants } from '../../app.constants';
import { GenericService } from '../../services';
import { TranslateService} from '@ngx-translate/core';
import { Message } from 'primeng/api';
import { Purchase, Reference, Quote } from 'src/app/models';
import { EmployeeDropdown } from '../dropdowns/dropdown.employee';
import { AppInfoStorage } from 'src/app/services/app.info.storage';
import { SupplierDropdown } from '../dropdowns/dropdown.supplier';
import { ProductDropdown } from '../dropdowns/dropdown.product';

@Component({
  selector: 'app-quote-details',
  templateUrl: '../../pages/stock/quoteDetails.html',
  providers: [GenericService, AppInfoStorage]

})
// tslint:disable-next-line:component-class-suffix
export class QuoteDetails implements OnInit, OnDestroy {

    quote: Quote = new Quote();
    messages: Message[] = [];
    @Output() quoteSaveEvent = new EventEmitter<Quote>();

    formData = new FormData();
    files: any = [];

    constructor
    (
      private genericService: GenericService,
      private translate: TranslateService,
      public appInfoStorage: AppInfoStorage,
      public  employeeDropdown: EmployeeDropdown,
      public  supplierDropdown: SupplierDropdown,
      public  productDropdown: ProductDropdown
    ) {
      this.quote = new Quote();
  }



  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.quote = null;
  }

  getQuote(quoteId: number) {
    this.files = [];
    this.formData = new FormData();
    this.messages = [];
    this.genericService.getOne(quoteId, 'com.wack.model.stock.Quote')
        .subscribe(result => {
      if (result.id > 0) {
        this.quote = result;
        this.quote.quoteDate = new Date(this.quote.quoteDate);
      } else {
        this.translate.get(['COMMON.READ', 'MESSAGE.READ_FAILED']).subscribe(res => {
          this.messages.push({severity:
            Constants.ERROR, summary:
            res['COMMON.READ'], detail:
            res['MESSAGE.READ_FAILED']});
        });
      }
    });
  }
  // tslint:disable-next-line:no-trailing-whitespace
  
  clear() {
    this.quote = new Quote();
  }


  save() {

    try {

      this.genericService.saveWithFile(this.quote, 'com.wack.model.stock.Quote', this.formData, 'saveCompany')
        .subscribe(result => {
          if (result.id > 0) {
            this.quote = result;
            this.quote.quoteDate =  new Date(this.quote.quoteDate);
            this.quoteSaveEvent.emit(this.quote);
            this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_SUCCESS']).subscribe(res => {
              this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.SAVE'], detail: res['MESSAGE.SAVE_SUCCESS']});
              });
          } else {
            this.translate.get(['COMMON.SAVE', 'MESSAGE.SAVE_SUCCESS']).subscribe(res => {
              this.messages.push({severity: Constants.SUCCESS, summary: res['COMMON.SAVE'], detail: res['MESSAGE.SAVE_SUCCESS']});
              });
          }
        });


    } catch (e) {
      console.log(e);
    }
  }


  public delete(fileName: string) {
    
  }

  public onFileUpload(event): void {

    const myFiles = event.files;
    if (event && myFiles && (myFiles.length > 0)) {
      const tempFileNames  = [];
      for (let i = 0; i < myFiles.length; i++) {
        alert(myFiles[i].name);
        this.formData.append('file[]', myFiles[i], myFiles[i].name);
        tempFileNames.push(myFiles[i].name);
      }
    }
}


}
