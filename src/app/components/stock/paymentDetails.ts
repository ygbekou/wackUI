import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Constants } from '../../app.constants';
import { GenericService } from '../../services';
import { TranslateService} from '@ngx-translate/core';
import { Message } from 'primeng/api';
import { Fund, Payment } from 'src/app/models';
import { EmployeeDropdown } from '../dropdowns/dropdown.employee';
import { AppInfoStorage } from 'src/app/services/app.info.storage';
import { PaymentTypeDropdown } from '../dropdowns/dropdown.paymentType';
import { ContractLaborDropdown } from '../dropdowns/dropdown.contractLabor';

@Component({
  selector: 'app-payment-details',
  templateUrl: '../../pages/stock/paymentDetails.html',
  providers: [GenericService, AppInfoStorage]

})
// tslint:disable-next-line:component-class-suffix
export class PaymentDetails implements OnInit, OnDestroy {

    payment: Payment = new Payment();
    messages: Message[] = [];
    @Output() paymentSaveEvent = new EventEmitter<Payment>();

    constructor
    (
      private genericService: GenericService,
      private translate: TranslateService,
      public appInfoStorage: AppInfoStorage,
      public  employeeDropdown: EmployeeDropdown,
      public  paymentTypeDropdown: PaymentTypeDropdown,
      public  contractLaborDropdown: ContractLaborDropdown
    ) {
      this.payment = new Payment();
  }



  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.payment = null;
  }

  getPayment(paymentId: number) {

    this.messages = [];
    this.genericService.getOne(paymentId, 'com.wack.model.stock.Payment')
        .subscribe(result => {
      if (result.id > 0) {
        this.payment = result;
        this.payment.paymentDate = new Date(this.payment.paymentDate);
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
    this.payment = new Payment();
  }


  save() {

    try {

      
      this.genericService.savePayment(this.payment)
        .subscribe(result => {
          if (result.id > 0) {
            this.payment = result;
            this.payment.paymentDate =  new Date(this.payment.paymentDate);
            this.paymentSaveEvent.emit(this.payment);
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

  cancel() {
    this.payment.status = 1;
    this.save();
  }

  isNew() {
    return this.payment.id === undefined || this.payment.id === null;
  }

  isCancel() {
    return this.payment.status === 1;
  }
}
