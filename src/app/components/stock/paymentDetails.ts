import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { Constants } from '../../app.constants';
import { GenericService } from '../../services';
import { TranslateService} from '@ngx-translate/core';
import { Message } from 'primeng/api';
import { Payment } from 'src/app/models';
import { EmployeeDropdown } from '../dropdowns/dropdown.employee';
import { AppInfoStorage } from 'src/app/services/app.info.storage';
import { PaymentTypeDropdown } from '../dropdowns/dropdown.paymentType';
import { ContractLaborDropdown } from '../dropdowns/dropdown.contractLabor';
import { MonthDropdown } from '../dropdowns/dropdown.month';
import { YearDropdown } from '../dropdowns/dropdown.year';

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
    @Input() paymentGroup: string;

    constructor
    (
      private genericService: GenericService,
      private translate: TranslateService,
      public appInfoStorage: AppInfoStorage,
      public  employeeDropdown: EmployeeDropdown,
      public  paymentTypeDropdown: PaymentTypeDropdown,
      public  monthDropdown: MonthDropdown,
      public  yearDropdown: YearDropdown,
      public  contractLaborDropdown: ContractLaborDropdown
    ) {
      this.payment = new Payment();
  }



  ngOnInit(): void {

    if (this.yearDropdown.years.length === 0) {
      const year = new Date().getFullYear();
      this.yearDropdown.years.push(year - 1);
      this.yearDropdown.years.push(year);
      this.yearDropdown.years.push(year + 1);

    }
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

    if (this.paymentGroup === 'SALARY') {
      this.payment.paymentType = this.paymentTypeDropdown.paymentTypes.find(x => x.id === 100);
    }

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
