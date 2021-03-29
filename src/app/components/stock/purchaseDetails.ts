import { Component, OnInit, OnDestroy, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Constants } from '../../app.constants';
import { GenericService } from '../../services';
import { TranslateService} from '@ngx-translate/core';
import { Message } from 'primeng/api';
import { Purchase } from 'src/app/models';
import { EmployeeDropdown } from '../dropdowns/dropdown.employee';
import { AppInfoStorage } from 'src/app/services/app.info.storage';
import { SupplierDropdown } from '../dropdowns/dropdown.supplier';
import { ProductDropdown } from '../dropdowns/dropdown.product';

@Component({
  selector: 'app-purchase-details',
  templateUrl: '../../pages/stock/purchaseDetails.html',
  providers: [GenericService, AppInfoStorage]

})
// tslint:disable-next-line:component-class-suffix
export class PurchaseDetails implements OnInit, OnDestroy {

    purchase: Purchase = new Purchase();
    messages: Message[] = [];
    @Output() purchaseSaveEvent = new EventEmitter<Purchase>();

    @ViewChild('picture', {static: false}) picture: ElementRef;
    formData = new FormData();

    constructor
    (
      private genericService: GenericService,
      private translate: TranslateService,
      public appInfoStorage: AppInfoStorage,
      public  employeeDropdown: EmployeeDropdown,
      public  supplierDropdown: SupplierDropdown,
      public  productDropdown: ProductDropdown
    ) {
      this.purchase = new Purchase();
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.purchase = null;
  }

  getPurchase(purchaseId: number) {

    this.messages = [];
    this.genericService.getOne(purchaseId, 'com.wack.model.stock.Purchase')
        .subscribe(result => {
      if (result.id > 0) {
        this.purchase = result;
        this.purchase.purchaseDate = new Date(this.purchase.purchaseDate);
        this.purchase.purchaseDate = new Date(this.purchase.purchaseDate.toLocaleString('en-US', {timeZone: 'UTC'}));
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
    this.purchase = new Purchase();
    this.formData = new FormData();
  }

  cancel() {
    this.purchase.status = 1;
    this.save();
  }

  save() {

    try {

      this.genericService.saveWithFile(this.purchase, 'com.wack.model.stock.Purchase', this.formData, 'saveCompany')
        .subscribe(result => {
          if (result.id > 0) {
            this.purchase = result;
            this.purchase.purchaseDate =  new Date(this.purchase.purchaseDate);
            this.purchaseSaveEvent.emit(this.purchase);
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


  delete() {

  }

  public onFileUpload(event, index): void {

    const myFiles = event.files;
    if (event && myFiles && (myFiles.length > 0)) {
      const tempFileNames  = [];
      for (let i = 0; i < myFiles.length; i++) {

        this.formData.append('file[]', myFiles[i], 'receipt' + index + '.' + myFiles[i].name.split('.')[1]);
        tempFileNames.push(myFiles[i].name);
      }
    }
}


 public hasReceipt1() {
   return this.purchase.receipt1 !== undefined && this.purchase.receipt1 !== null && this.purchase.receipt1 !== '';
 }

 public hasReceipt2() {
   return this.purchase.receipt2 !== undefined && this.purchase.receipt2 !== null && this.purchase.receipt2 !== '';
 }

 public hasReceipt3() {
   return this.purchase.receipt3 !== undefined && this.purchase.receipt3 !== null && this.purchase.receipt3 !== '';
 }

  isNew() {
    return this.purchase.id === undefined || this.purchase.id === null;
  }

  isCancel() {
    return this.purchase.status === 1;
  }
}
