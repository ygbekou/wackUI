import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Constants } from '../../app.constants';
import { GenericService } from '../../services';
import { TranslateService} from '@ngx-translate/core';
import { Message } from 'primeng/api';
import { Fund, Supplier } from 'src/app/models/stock';
import { EmployeeDropdown } from '../dropdowns/dropdown.employee';
import { AppInfoStorage } from 'src/app/services/app.info.storage';

@Component({
  selector: 'app-supplier-details',
  templateUrl: '../../pages/stock/supplierDetails.html',
  providers: [GenericService, AppInfoStorage]

})
// tslint:disable-next-line:component-class-suffix
export class SupplierDetails implements OnInit, OnDestroy {

    supplier: Supplier = new Supplier();
    messages: Message[] = [];
    @Output() supplierSaveEvent = new EventEmitter<Supplier>();

    constructor
    (
      private genericService: GenericService,
      private translate: TranslateService,
      public appInfoStorage: AppInfoStorage,
      public  employeeDropdown: EmployeeDropdown
    ) {
      this.supplier = new Supplier();
  }



  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.supplier = null;
  }

  getSupplier(supplierId: number) {

    this.messages = [];
    this.genericService.getOne(supplierId, 'com.wack.model.stock.Supplier')
        .subscribe(result => {
      if (result.id > 0) {
        this.supplier = result;
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
    this.supplier = new Supplier();
  }


  save() {

    try {

      
      this.genericService.save(this.supplier, 'com.wack.model.stock.Supplier')
        .subscribe(result => {
          if (result.id > 0) {
            this.supplier = result;
            this.supplierSaveEvent.emit(this.supplier);
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

}
